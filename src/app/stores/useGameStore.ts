"use client";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { io, Socket } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const BACKEND_URL = "https://9yfbbh3enhk8ll-8000.proxy.runpod.net"; //" ""

type Player = {
  username: string;
  has_paid?: boolean;
  avatarUrl?: string;
};

interface GameModeInfo {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  mode: "solo" | "multiplayer";
  difficulty: "easy" | "hard";
}

const getRemainingSeconds = (
  startTime: number | undefined,
  totalDuration: number
): number => {
  if (!startTime) return totalDuration;
  const elapsedMs = Date.now() - startTime;
  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  return Math.max(0, totalDuration - elapsedSeconds);
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
  paymentStartTime: number | null; // Add this
  wordLength: number;
  attemptsLeft: number;
  maxAttempts: number;
  gameMode: "solo" | "multiplayer";
  turnTime: number; // Total time per turn in seconds
  turnTimeLeft: number; // Remaining time for the current turn
  turnStartTime: number | null; // Global turn time
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
  updateAvatar: (file: File) => Promise<void>; // Add this
  setWinModalOpen: (isOpen: boolean) => void;
  setCountdownModalOpen: (isOpen: boolean) => void;
  setPaymentModalOpen: (isOpen: boolean) => void;
  submitGuess: (guess: string) => void;
  sendChatMessage: (message: string) => void;
  login: (username: string) => Promise<void>;
  availableGameModes: GameModeInfo[];
  fetchGameModes: () => Promise<void>;
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
  onRehydrateStorage: () => (state) => {
    if (state?.jwt) {
      try {
        const decoded = jwtDecode(state.jwt) as {
          exp: number;
          username: string;
          avatarUrl: string;
        };
        if (Date.now() < decoded.exp * 1000) {
          // FIX: Sync state from the valid token on load
          state.username = decoded.username;
          state.avatarUrl = decoded.avatarUrl;
          state.connectSocket();
        } else {
          state.resetGame(); // Full logout
        }
      } catch (e) {
        state.resetGame(); // Full logout
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
      turnStartTime: null,
      currentTurnPlayer: null,
      turnNumber: 1,
      playerMistakes: {},
      maxPlayerMistakes: 6,
      players: [],
      currentUserPeelWallet: null,
      entryFee: 0,
      paymentTimeout: 0,
      wordLength: 0,
      attemptsLeft: 0,
      maxAttempts: 6,
      paymentStartTime: null,
      maskedWord: "",
      messages: [],
      winner: null,
      secretWord: "",
      rewardStatus: null,
      rewardTxSignature: null,
      avatarUrl: "/images/avatar/1.png",
      turnTimerInterval: null,
      availableGameModes: [],

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
            const message = data.error || "Login failed.";

            // FIX: Check for the specific error message from the server.
            if (message.includes("User for this token not found")) {
              console.log(
                "Stale user session detected. Clearing local storage."
              );
              // This function clears localStorage and resets the state.
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
                jwt: null,
                username: "",
              });
              // Set a user-friendly message.
              setErrorMessage("Your session was invalid. Please log in again.");
            } else {
              setErrorMessage(message);
            }
            set({ isLoading: false });
            return; // Stop the function
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

          get().connectSocket();
        } catch (error: any) {
          set({ errorMessage: error.message, isLoading: false });
        }
      },
      startMatchmaking: () => {
        const { socket, difficulty, gameMode, setErrorMessage } = get();
        if (!socket)
          return setErrorMessage(
            "Not connected to the server. Please refresh."
          );

        console.log(`Requesting a '${difficulty}' '${gameMode}' game...`);
        set({ isLoading: true });
        // FIX: This is now the ONLY place that tells the server to start a game.
        socket.emit("start_matchmaking", { difficulty, gameMode });
      },
      cancelMatchmaking: () => {
        const { socket } = get();
        // Send the cancel event to the server
        socket?.emit("cancel_matchmaking");
        // Immediately update the UI
        set({ isLoading: false });
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
          isPaymentModalOpen: false,
          isLoading: false,
          roomId: null,
          players: [],
          messages: [],
          turnTimerInterval: null,
        });
      },
      connectSocket: () => {
        const { jwt, socket } = get();
        // Prevent reconnecting if a socket already exists or if not logged in.
        if (socket || !jwt) return;

        // Establish the connection ONCE.
        const newSocket = io(BACKEND_URL, { auth: { token: jwt } });
        set({ socket: newSocket });
        newSocket.on("connect", () => {
          console.log(
            "Socket connected and authenticated. Requesting game state..."
          );
          newSocket.emit("request_room_state");
        });
        // FIX: This new handler will restore your game state after a refresh.
        newSocket.on("full_room_state", (data) => {
          console.log("Received full room state:", data);
          if (!data) return set({ view: "lobby" });

          if (data.state === "waiting_for_payment") {
            const { sub: myPlayerId } = jwtDecode(get().jwt!) as {
              sub: string;
            };
            const myPaymentInfo = data.players.find(
              (p: any) => p.playerId === myPlayerId
            );

            set({
              isPaymentModalOpen: true,
              paymentTimeout: data.paymentTimeout, // Store total duration
              paymentStartTime: data.paymentStartTime, // Store start time
              entryFee: data.entryFee,
              roomId: data.roomId,
              players: data.players,
              currentUserPeelWallet: myPaymentInfo?.peelWalletAddress,
            });
          } else if (data.state === "playing") {
            if (get().turnTimerInterval)
              clearInterval(get().turnTimerInterval!);

            set({
              view: "game",
              roomId: data.roomId,
              players: data.players,
              gameMode: data.gameMode,
              difficulty: data.difficulty,
              maxAttempts: data.maxAttempts,
              maxPlayerMistakes: data.maxPlayerMistakes,
              playerMistakes: data.playerMistakes,
              turnNumber: data.turnNumber,
              turnTime: data.turnTime,
              maskedWord: data.maskedWord,
              attemptsLeft: data.attemptsLeft,
              currentTurnPlayer: data.currentTurnPlayer,
              turnStartTime: data.turnStartTime,
              messages: data.messages || [],
              isPaymentModalOpen: false,
              turnTimeLeft: getRemainingSeconds(
                data.turnStartTime,
                data.turnTime
              ),
            });

            if (get().turnTimerInterval)
              clearInterval(get().turnTimerInterval!);
            const newInterval = setInterval(() => {
              const startTime = get().turnStartTime;
              if (startTime) {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                set({ turnTimeLeft: Math.max(0, get().turnTime - elapsed) });
              }
            }, 1000);
            set({ turnTimerInterval: newInterval });
          }
        });
        newSocket.on("error", (error) => {
          // Handles fatal errors
          console.error("Fatal Server Error:", error.message);
          get().setErrorMessage(error.message || "A critical error occurred.");
          get().resetGame();
        });
        newSocket.on("disconnect", (reason) => {
          console.log("Socket disconnected:", reason);
          if (get().turnTimerInterval) clearInterval(get().turnTimerInterval!);
          set({ socket: null, isLoading: false });
          // If the server forced the disconnect, it's a critical error.
          if (reason === "io server disconnect") {
            get().resetGame();
          }
        });
        newSocket.on("game_warning", (data) => {
          // Show the error message without disconnecting or resetting the game
          get().setErrorMessage(data.message);
        });
        newSocket.on("error", (error) => {
          console.log(error);
          get().setErrorMessage(error.message || "A critical error occurred.");
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
          if (get().turnTimerInterval) clearInterval(get().turnTimerInterval!);
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
            turnStartTime: data.turnStartTime, // Set the start time
          });

          if (data.gameMode === "solo" || data.gameMode === "multiplayer") {
            if (get().turnTimerInterval)
              clearInterval(get().turnTimerInterval!);

            // Start the timer interval
            const newInterval = setInterval(() => {
              const startTime = get().turnStartTime;
              if (startTime) {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                set({ turnTimeLeft: Math.max(0, get().turnTime - elapsed) });
              }
            }, 1000);
            set({ turnTimerInterval: newInterval });
          }
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
            paymentTimeout: data.timeoutSeconds, // Store total duration
            paymentStartTime: data.paymentStartTime, // Store start time
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
            // FIX: Add this line to update the mistakes
            playerMistakes: data.playerMistakes,
          }));
        });
        newSocket.on("turn_update", (data) => {
          // Clear any old timer that might be running
          if (get().turnTimerInterval) clearInterval(get().turnTimerInterval!);

          set({
            currentTurnPlayer: data.currentTurnPlayer,
            turnStartTime: data.turnStartTime, // Set the new start time
            turnNumber: data.turnNumber,
            playerMistakes: data.playerMistakes || {},
          });

          // Start the new timer interval
          const newInterval = setInterval(() => {
            const startTime = get().turnStartTime;
            if (startTime) {
              const elapsed = Math.floor((Date.now() - startTime) / 1000);
              set({ turnTimeLeft: Math.max(0, get().turnTime - elapsed) });
            }
          }, 1000);

          set({ turnTimerInterval: newInterval });
        });
        newSocket.on("game_over", (data) => {
          if (get().turnTimerInterval) {
            clearInterval(get().turnTimerInterval!);
          }
          if (data.reason == "Payment timeout") {
            get().setErrorMessage(
              "Payment timeout, you will get refunded automatically"
            );
            get().resetGameState();
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
      updateAvatar: async (file: File) => {
        const { jwt, setErrorMessage } = get();
        if (!jwt) {
          setErrorMessage("You must be logged in to change your avatar.");
          return;
        }

        const formData = new FormData();
        formData.append("avatar", file);

        set({ isLoading: true });
        try {
          const response = await fetch(`${BACKEND_URL}/upload-avatar`, {
            method: "POST",
            headers: { Authorization: `Bearer ${jwt}` },
            body: formData,
          });

          const data = await response.json();
          if (!response.ok)
            throw new Error(data.error || "Failed to upload avatar.");

          // Update the store with the new JWT and avatar URL
          set({
            jwt: data.jwt,
            avatarUrl: data.avatarUrl,
          });

          // FIX: Disconnect the old socket (which has the old identity)
          get().socket?.disconnect();

          // Reconnect with the new token to update the server's knowledge of our avatar
          get().connectSocket();
        } catch (error: any) {
          setErrorMessage(error.message);
        } finally {
          set({ isLoading: false });
        }
      },
      fetchGameModes: async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/api/game-modes`);
          if (!response.ok) {
            throw new Error("Failed to fetch game modes.");
          }
          const data = await response.json();
          set({ availableGameModes: data });
        } catch (error: any) {
          console.error("Error fetching game modes:", error);
          get().setErrorMessage(error.message);
        }
      },
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
