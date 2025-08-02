"use client";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { io, Socket } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const BACKEND_URL = "https://j7xps13tu1ds9z-8000.proxy.runpod.net";

type Player = {
  username: string;
  has_paid?: boolean;
};

type DisplayPlayer = {
  username: string;
  isOwner: boolean;
};

type Message = {
  username: string;
  message: string;
  isGuess: boolean;
};

type Winner = {
  username: string;
  walletAddress: string;
} | null;

interface GameState {
  view: "home" | "lobby" | "game";
  isLoading: boolean;
  errorMessage: string;
  isErrorModalOpen: boolean;
  isPaymentModalOpen: boolean;
  isCountdownModalOpen: boolean;
  isWinModalOpen: boolean;
  username: string;
  jwt: string | null;
  socket: Socket | null;
  roomId: string | null;
  difficulty: "easy" | "hard";
  players: Player[];
  currentUserPeelWallet: string | null;
  entryFee: number;
  paymentTimeout: number;
  wordLength: number;
  attemptsLeft: number;
  maxAttempts: number;
  maskedWord: string;
  messages: Message[];
  winner: Winner;
  secretWord: string;
  rewardStatus: "pending" | "sent" | null;
  rewardTxSignature: string | null;

  // Actions
  setView: (view: "home" | "lobby" | "game") => void;
  setUsername: (username: string) => void;
  setDifficulty: (difficulty: "easy" | "hard") => void;
  setWinModalOpen: (isOpen: boolean) => void;
  setCountdownModalOpen: (isOpen: boolean) => void;
  setPaymentModalOpen: (isOpen: boolean) => void;
  submitGuess: (guess: string) => void;
  sendChatMessage: (message: string) => void;
  matchmake: () => Promise<void>;
  setErrorMessage: (message: string) => void;
  clearErrorMessage: () => void;
  connectSocket: () => void;
  resetGame: () => void;
  cancelMatchmaking: () => Promise<void>;
}

type PersistedState = Pick<GameState, "jwt" | "username">;

const persistOptions: PersistOptions<GameState, PersistedState> = {
  name: "hangman-game-storage",
  partialize: (state) => ({ jwt: state.jwt, username: state.username }),

  // This function runs automatically after the store's state has been restored
  onRehydrateStorage: () => (state, error) => {
    if (error) {
      console.log("An error happened during hydration", error);
    } else {
      console.log("Hydration finished.");
      const { jwt } = state!;
      if (jwt) {
        try {
          const decoded: { exp: number } = jwtDecode(jwt);
          // Check if the persisted token is expired
          if (Date.now() >= decoded.exp * 1000) {
            console.log("Stale JWT found, clearing state.");
            state!.resetGame();
          } else {
            console.log("Active session found, reconnecting...");
            state!.connectSocket();
          }
        } catch (e) {
          console.log("Invalid JWT found, clearing state.");
          state!.resetGame();
        }
      }
    }
  },
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // --- STATE ---
      view: "home",
      isLoading: false,
      errorMessage: "",
      isErrorModalOpen: false,
      isPaymentModalOpen: false,
      isCountdownModalOpen: false,
      isWinModalOpen: false,
      username: "",
      jwt: null,
      socket: null,
      roomId: null,
      difficulty: "easy",
      players: [],
      currentUserPeelWallet: null,
      entryFee: 0,
      paymentTimeout: 0,
      wordLength: 0,
      attemptsLeft: 0,
      maxAttempts: 6,
      maskedWord: "",
      messages: [],
      winner: null,
      secretWord: "",
      rewardStatus: null,
      rewardTxSignature: null,

      // --- ACTIONS ---
      setView: (view) => set({ view, errorMessage: "" }),
      setUsername: (username) => set({ username }),
      setDifficulty: (difficulty) => set({ difficulty }),
      setWinModalOpen: (isOpen) => set({ isWinModalOpen: isOpen }),

      setErrorMessage: (message) =>
        set({ errorMessage: message, isErrorModalOpen: true }),
      clearErrorMessage: () =>
        set({ errorMessage: "", isErrorModalOpen: false }),
      // Centralized reset action for all session cleanup
      resetGame: () => {
        get().socket?.disconnect();
        set({
          socket: null,
          jwt: null,
          roomId: null,
          players: [],
          messages: [],
          isPaymentModalOpen: false,
          isCountdownModalOpen: false,
          isWinModalOpen: false,
          isLoading: false,
          errorMessage: "",
          winner: null,
          rewardStatus: null,
          rewardTxSignature: null,
        });
      },

      cancelMatchmaking: async () => {
        const { jwt, resetGame, setErrorMessage } = get();
        if (!jwt) return;

        set({ isLoading: true });
        try {
          const response = await fetch(`${BACKEND_URL}/cancel_matchmaking`, {
            method: "POST",
            headers: { Authorization: `Bearer ${jwt}` },
          });
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || "Failed to cancel matchmaking.");
          }
          resetGame();
        } catch (error: any) {
          setErrorMessage(error.message);
        } finally {
          set({ isLoading: false });
        }
      },

      matchmake: async () => {
        const { username, difficulty, setErrorMessage } = get();
        set({ isLoading: true, errorMessage: "" });
        try {
          const response = await fetch(`${BACKEND_URL}/matchmake`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, difficulty }),
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.detail || "Matchmaking failed.");
          }

          set({
            jwt: data.jwt,
            players: [{ username }],
            isLoading: false,
          });

          get().connectSocket();
        } catch (error: any) {
          setErrorMessage(error.message);
          set({ isLoading: false });
        }
      },

      connectSocket: () => {
        const { jwt, socket, resetGame } = get();
        if (socket || !jwt) return;

        const newSocket = io(BACKEND_URL, { auth: { token: jwt } });
        set({ socket: newSocket });

        newSocket.on("connect", () => {
          console.log("Socket connected, requesting room state...");
          newSocket.emit("request_room_state");
        });

        newSocket.on("disconnect", (reason) => {
          // If the server kicks us out (e.g., room is gone), reset the state
          if (reason === "io server disconnect") {
            console.warn("Disconnected by server, resetting session.");
            resetGame();
          }
        });

        // Universal handler to re-sync state after a refresh
        newSocket.on("full_room_state", (data) => {
          console.log("Received full room state:", data);
          if (data.state === "waiting_for_payment") {
            set({
              players: data.players,
              entryFee: data.entryFee,
              currentUserPeelWallet: data.currentUserPeelWallet,
              isPaymentModalOpen: true,
            });
          } else if (data.state === "playing") {
            set({
              view: "game",
              players: data.players,
              maskedWord: data.maskedWord,
              attemptsLeft: data.attemptsLeft,
              maxAttempts: data.maxAttempts,
              messages: data.messages,
              isPaymentModalOpen: false,
            });
          }
        });

        newSocket.on("match_found", (data) => {
          console.log("Match has been found!", data);
          set({
            roomId: data.roomId,
            players: data.players,
            isLoading: false, // Matchmaking search is over
          });
          // The server will now send the 'payment_required' event
        });

        // --- All other regular event handlers ---
        newSocket.on("player_joined", (data) =>
          set((state) => ({ players: [...state.players, data] }))
        );
        newSocket.on("player_left", (data) => {
          set((state) => ({
            players: state.players.filter((p) => p.username !== data.username),
          }));
        });
        newSocket.on("payment_required", (data) => {
          const { sub: myPlayerId } = jwtDecode(get().jwt!);
          const myPaymentInfo = data.players.find(
            (p: any) => p.playerId === myPlayerId
          );
          set({
            isPaymentModalOpen: true,
            isLoading: false,
            entryFee: data.fee,
            paymentTimeout: data.timeoutSeconds,
            currentUserPeelWallet: myPaymentInfo?.peelWalletAddress,
            players: data.players.map((p: any) => ({
              username: p.username,
              has_paid: false,
            })),
          });
        });
        newSocket.on("player_paid", (data) => {
          set((state) => ({
            players: state.players.map((p) =>
              p.username === data.username ? { ...p, has_paid: true } : p
            ),
          }));
        });
        newSocket.on("game_started", (data) => {
          set({
            isPaymentModalOpen: false,
            isCountdownModalOpen: true,
            maskedWord: data.maskedWord,
            attemptsLeft: data.attemptsLeft,
            maxAttempts: data.attemptsLeft,
            players: data.players,
            messages: [],
          });
        });
        newSocket.on("new_message", (data) =>
          set((state) => ({ messages: [...state.messages, data] }))
        );
        newSocket.on("state_update", (data) => {
          set((state) => ({
            messages: [
              ...state.messages,
              { username: data.guesser, message: data.guess, isGuess: true },
            ],
            maskedWord: data.maskedWord,
            attemptsLeft: data.attemptsLeft,
          }));
        });
        newSocket.on("game_over", (data) => {
          const isWinner = data.winner?.username === get().username;
          set({
            winner: data.winner,
            secretWord: data.secretWord,
            isWinModalOpen: true,
            rewardStatus: isWinner ? "pending" : null,
            view: "lobby",
          });
        });
        newSocket.on("reward_sent", (data) => {
          set({ rewardStatus: "sent", rewardTxSignature: data.signature });
        });
      },

      // These actions are simple setters now, cleanup is handled by resetGame
      setPaymentModalOpen: (isOpen) => set({ isPaymentModalOpen: isOpen }),
      setCountdownModalOpen: (isOpen) => set({ isCountdownModalOpen: isOpen }),
      submitGuess: (guess) => {
        get().socket?.emit("guess", { guess: guess.trim() });
      },
      sendChatMessage: (message) => {
        get().socket?.emit("send_chat_message", { message: message.trim() });
      },
    }),
    persistOptions
  )
);
