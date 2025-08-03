"use client";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { io, Socket } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const BACKEND_URL = "https://9yfbbh3enhk8ll-8000.proxy.runpod.net"; //"http://localhost:8000 ";

type Player = {
  username: string;
  has_paid?: boolean;
  avatarUrl?: string;
};

type DisplayPlayer = {
  username: string;
  isOwner: boolean;
};

type Message = {
  username: string;
  message: string;
  isGuess: boolean;
  avatarUrl: string;
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
  gameMode: "solo" | "multiplayer";
  turnTime: number; // Total time per turn in seconds
  turnTimeLeft: number; // Remaining time for the current turn
  currentTurnPlayer: string | null; // Username of the player whose turn it is
  turnNumber: number;
  playerMistakes: { [username: string]: number }; // Tracks mistakes per player
  maxPlayerMistakes: number; // Max mistakes before a player is out
  maskedWord: string;
  messages: Message[];
  winner: Winner;
  secretWord: string;
  avatarUrl: string;
  rewardStatus: "pending" | "sent" | null;
  rewardTxSignature: string | null;
  isTutorialOpen: boolean;

  turnTimerInterval: NodeJS.Timeout | null;
  // Actions
  setView: (view: "home" | "lobby" | "game") => void;
  setUsername: (username: string) => void;
  setDifficulty: (difficulty: "easy" | "hard") => void;
  setGameMode: (gameMode: "solo" | "multiplayer") => void;
  setWinModalOpen: (isOpen: boolean) => void;
  setCountdownModalOpen: (isOpen: boolean) => void;
  setPaymentModalOpen: (isOpen: boolean) => void;
  submitGuess: (guess: string) => void;
  sendChatMessage: (message: string) => void;
  login: (username: string) => Promise<void>;
  startMatchmaking: () => void;
  cancelMatchmaking: () => void;
  setErrorMessage: (message: string) => void;
  clearErrorMessage: () => void;
  connectSocket: () => void;
  resetGame: () => void;
  setIsTutorialOpen: (isOpen: boolean) => void;
  resetGameState: () => void;
}

type PersistedState = Pick<GameState, "jwt" | "username" | "avatarUrl">;

const persistOptions: PersistOptions<GameState, PersistedState> = {
  name: "hangman-game-storage",
  partialize: (state) => ({
    jwt: state.jwt,
    username: state.username,
    avatarUrl: state.avatarUrl,
  }),

  onRehydrateStorage: () => (state, error) => {
    if (error) {
      console.error("An error occurred during storage rehydration:", error);
      return;
    }
    if (state && state.jwt) {
      try {
        const decoded: { exp: number } = jwtDecode(state.jwt);
        // If the token from storage is expired, reset everything.
        if (Date.now() >= decoded.exp * 1000) {
          console.log("Persisted token is expired. Clearing session.");
          state.resetGame();
        } else {
          // FIX: If the session is valid, send the user directly to the lobby.
          console.log("Valid session rehydrated. Moving to lobby.");
          state.setView("lobby");
        }
      } catch (e) {
        console.error("Failed to decode persisted JWT. Clearing session.", e);
        state.resetGame();
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
      isTutorialOpen: false,
      username: "",
      jwt: null,
      socket: null,
      roomId: null,
      difficulty: "easy",
      gameMode: "multiplayer",
      turnTime: 30,
      turnTimeLeft: 30,
      currentTurnPlayer: null,
      turnNumber: 1,
      playerMistakes: {},
      maxPlayerMistakes: 3,
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
      avatarUrl: "/images/avatar/1.png",
      turnTimerInterval: null,

      // --- ACTIONS ---
      setIsTutorialOpen: (isOpen) => set({ isTutorialOpen: isOpen }),
      setView: (view) => set({ view, errorMessage: "" }),
      setUsername: (username) => set({ username }),
      setDifficulty: (difficulty) => set({ difficulty }),
      setGameMode: (gameMode) => set({ gameMode }),
      setWinModalOpen: (isOpen) => set({ isWinModalOpen: isOpen }),
      setErrorMessage: (message) =>
        set({ errorMessage: message, isErrorModalOpen: true }),
      clearErrorMessage: () =>
        set({ errorMessage: "", isErrorModalOpen: false }),

      login: async (username: string) => {
        // Accept username as a parameter
        // Get the other needed state
        const { jwt: existingToken, avatarUrl, setErrorMessage } = get();

        if (!username.trim()) {
          setErrorMessage("Please enter a username.");
          return;
        }

        set({ isLoading: true, errorMessage: "" });
        try {
          const response = await fetch(`${BACKEND_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, jwt: existingToken, avatarUrl }),
          });

          const data = await response.json();
          if (!response.ok) {
            const message = data.error || "Login failed. Please try again.";
            setErrorMessage(message);
            set({ isLoading: false });
            return;
          }

          const decoded: { username: string; avatarUrl: string } = jwtDecode(
            data.jwt
          );

          // This is the only point where we set the persisted state
          set({
            jwt: data.jwt,
            username: decoded.username,
            avatarUrl: decoded.avatarUrl,
            isLoading: false,
            view: "lobby",
          });
        } catch (error: any) {
          set({ errorMessage: error.message, isLoading: false });
        }
      },
      startMatchmaking: () => {
        const { jwt, socket, difficulty, gameMode, setErrorMessage } = get();
        if (socket || !jwt) return;

        // Add this validation block
        if (!gameMode || !difficulty) {
          console.error(
            "Attempted to start matchmaking without selecting a game mode."
          );
          setErrorMessage("Please select a game mode first.");
          return;
        }

        // If validation passes, proceed to connect.
        get().connectSocket();
      },

      cancelMatchmaking: () => {
        if (get().turnTimerInterval) {
          clearInterval(get().turnTimerInterval!);
        }
        get().socket?.disconnect();
        set({ socket: null, isLoading: false, turnTimerInterval: null });
        console.log("Matchmaking cancelled by user.");
      },

      resetGame: () => {
        if (get().turnTimerInterval) {
          clearInterval(get().turnTimerInterval!);
        }
        get().socket?.disconnect();
        set({
          socket: null,
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
          view: "home",
          turnTimerInterval: null,
        });
      },
      resetGameState: () => {
        if (get().turnTimerInterval) {
          clearInterval(get().turnTimerInterval!);
        }
        set({
          view: "lobby", // Go back to the lobby, not home
          socket: null,
          isLoading: false,
          roomId: null,
          players: [],
          messages: [],
          winner: null,
          maskedWord: "",
          secretWord: "",
          turnTimerInterval: null,
          // IMPORTANT: We DO NOT clear jwt, username, or avatarUrl here.
        });
      },

      connectSocket: () => {
        const { jwt, difficulty, gameMode, resetGame } = get();
        if (!jwt) return;

        console.log(
          `Connecting to find a '${difficulty}' '${gameMode}' game...`
        );
        set({ isLoading: true, errorMessage: "" });

        const newSocket = io(BACKEND_URL, {
          auth: { token: jwt },
          query: { difficulty, gameMode },
        });

        set({ socket: newSocket });

        newSocket.on("connect", () => {
          console.log("Socket connected, waiting for match...");
        });

        newSocket.on("error", (errorData) => {
          console.error("Server Error:", errorData.message);
          // Use the existing setErrorMessage action to show the error
          get().setErrorMessage(
            errorData.message || "An unknown error occurred."
          );
        });
        newSocket.on("disconnect", (reason) => {
          if (reason === "io server disconnect") {
            console.warn("Disconnected by server, resetting session.");
            resetGame();
          }
          set({ isLoading: false, socket: null });
        });

        newSocket.on("game_warning", (data) => {
          // Show the error message without disconnecting or resetting the game
          get().setErrorMessage(data.message);
        });

        newSocket.on("error", (error) => {
          set({
            isLoading: false,
            errorMessage:
              error.message || "An unknown connection error occurred.",
          });
        });

        newSocket.on("match_found", (data) => {
          console.log("Match has been found!", data);
          set({
            roomId: data.roomId,
            players: data.players,
            isLoading: false,
          });
        });

        newSocket.on("game_started", (data) => {
          set({
            view: "game",
            isPaymentModalOpen: false,
            isCountdownModalOpen: true,
            maskedWord: data.maskedWord,
            attemptsLeft: data.attemptsLeft,
            maxAttempts: data.maxAttempts,
            players: data.players,
            messages: [],
            gameMode: data.gameMode,
            currentTurnPlayer: data.currentTurnPlayer,
            turnNumber: data.turnNumber,
            playerMistakes: {},
            turnTime: data.turnTime,
            turnTimeLeft: data.turnTime,
          });
        });
        newSocket.on("payment_required", (data) => {
          // FIX: Correctly decode the 'sub' (subject/user ID) claim from the JWT.
          const { sub: myPlayerId } = jwtDecode(get().jwt!) as { sub: string };

          const myPaymentInfo = data.players.find(
            (p: any) => p.playerId === myPlayerId
          );
          set({
            isPaymentModalOpen: true,
            isLoading: false,
            entryFee: data.fee,
            paymentTimeout: data.timeoutSeconds,
            // This will now correctly be the unique wallet for the current player
            currentUserPeelWallet: myPaymentInfo?.peelWalletAddress,
            players: data.players.map((p: any) => ({
              username: p.username,
              avatarUrl: p.avatarUrl, // Make sure avatar is passed through
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
            // Add new state here
            gameMode: data.gameMode || "multiplayer",
            currentTurnPlayer: data.currentTurnPlayer ?? "Gazz",
            turnNumber: 1,
            playerMistakes: {},
            turnTimeLeft: data.turnTime || 10,
            turnTime: data.turnTime || 30,
          });
        });
        newSocket.on("new_message", (data) =>
          set((state) => ({ messages: [...state.messages, data] }))
        );
        newSocket.on("state_update", (data) => {
          set((state) => ({
            messages: [
              ...state.messages,
              {
                username: data.guesser,
                message: data.guess,
                isGuess: true,
                avatarUrl: data.avatarUrl,
              },
            ],
            maskedWord: data.maskedWord,
            attemptsLeft: data.attemptsLeft,
            avatarUrl: data.avatarUrl,
          }));
        });
        newSocket.on("turn_update", (data) => {
          // Clear any old timer that might be running
          if (get().turnTimerInterval) {
            clearInterval(get().turnTimerInterval!);
          }

          set({
            currentTurnPlayer: data.currentTurnPlayer,
            turnTimeLeft: data.turnTime, // Reset timer to full duration
            turnNumber: data.turnNumber,
            playerMistakes: data.playerMistakes || {},
          });

          // Create a new interval to tick down the timer
          const newInterval = setInterval(() => {
            set((state) => ({
              turnTimeLeft: Math.max(0, state.turnTimeLeft - 1),
            }));
          }, 1000);

          set({ turnTimerInterval: newInterval });
        });

        newSocket.on("game_over", (data) => {
          if (data.reason == "Payment timeout") {
            get().setErrorMessage(
              "Payment timeout, you will get refunded automatically"
            );
            set({
              view: "lobby",
              turnTimerInterval: null,
              isPaymentModalOpen: false,
              currentUserPeelWallet: null,
              players: [],
            });
            return;
          }
          const isWinner = data.winner?.username === get().username;
          set({
            winner: data.winner,
            secretWord: data.secretWord,
            isWinModalOpen: true,
            rewardStatus: isWinner ? "pending" : null,
            view: "lobby",
            turnTimerInterval: null,
          });
          get().resetGameState();
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
