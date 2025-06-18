(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "api": (()=>api),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:3001") || 'http://localhost:3001';
async function fetchWithAuth(endpoint, options = {}) {
    try {
        const token = localStorage.getItem('token');
        const headers = new Headers(options.headers || {});
        headers.set('Content-Type', 'application/json');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                error: data.error || 'Something went wrong'
            };
        }
        return {
            data
        };
    } catch (error) {
        return {
            error: error.message
        };
    }
}
const api = {
    // Auth endpoints
    login: async (email, password)=>{
        return fetchWithAuth('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        });
    },
    register: async (username, email, password)=>{
        return fetchWithAuth('/api/users/register', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            })
        });
    },
    logout: async ()=>{
        return fetchWithAuth('/api/users/logout', {
            method: 'POST'
        });
    },
    // User Profile endpoints
    getProfile: async ()=>{
        return fetchWithAuth('/api/users/profile');
    },
    getUserProfile: async (userId)=>{
        return fetchWithAuth(`/api/users/${userId}`);
    },
    updateProfile: async (userData)=>{
        const token = localStorage.getItem('token');
        const headers = new Headers();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
                method: 'PUT',
                headers,
                body: userData
            });
            const data = await response.json();
            if (!response.ok) {
                return {
                    error: data.error || 'Failed to update profile'
                };
            }
            return {
                data
            };
        } catch (error) {
            return {
                error: error.message
            };
        }
    },
    // Search endpoints
    searchMessages: async (params)=>{
        const queryParams = new URLSearchParams({
            term: params.term,
            page: params.page.toString(),
            pageSize: params.pageSize.toString(),
            ...params.roomId && {
                roomId: params.roomId
            },
            ...params.filters && {
                filters: JSON.stringify(params.filters)
            }
        });
        return fetchWithAuth(`/api/messages/search?${queryParams.toString()}`);
    },
    getSearchSuggestions: async (query)=>{
        return fetchWithAuth(`/api/messages/suggestions?q=${encodeURIComponent(query)}`);
    },
    searchUsers: async (query)=>{
        return fetchWithAuth(`/api/users/search?q=${encodeURIComponent(query)}`);
    },
    // Contact Management
    addContact: async (userId)=>{
        return fetchWithAuth(`/api/users/contacts/${userId}`, {
            method: 'POST'
        });
    },
    removeContact: async (userId)=>{
        return fetchWithAuth(`/api/users/contacts/${userId}`, {
            method: 'DELETE'
        });
    },
    blockUser: async (userId)=>{
        return fetchWithAuth(`/api/users/block/${userId}`, {
            method: 'POST'
        });
    },
    unblockUser: async (userId)=>{
        return fetchWithAuth(`/api/users/block/${userId}`, {
            method: 'DELETE'
        });
    },
    // Room endpoints
    getRooms: async ()=>{
        return fetchWithAuth('/api/rooms');
    },
    createRoom: async (formData)=>{
        const token = localStorage.getItem('token');
        const headers = new Headers();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/rooms`, {
                method: 'POST',
                headers,
                body: formData
            });
            const data = await response.json();
            if (!response.ok) {
                return {
                    error: data.error || 'Failed to create room'
                };
            }
            return {
                data
            };
        } catch (error) {
            return {
                error: error.message
            };
        }
    },
    joinRoom: async (roomId)=>{
        return fetchWithAuth(`/api/rooms/${roomId}/join`, {
            method: 'POST'
        });
    },
    leaveRoom: async (roomId)=>{
        return fetchWithAuth(`/api/rooms/${roomId}/leave`, {
            method: 'POST'
        });
    },
    updateRoom: async (roomId, formData)=>{
        const token = localStorage.getItem('token');
        const headers = new Headers();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/rooms/${roomId}`, {
                method: 'PUT',
                headers,
                body: formData
            });
            const data = await response.json();
            if (!response.ok) {
                return {
                    error: data.error || 'Failed to update room'
                };
            }
            return {
                data
            };
        } catch (error) {
            return {
                error: error.message
            };
        }
    },
    deleteRoom: async (roomId)=>{
        return fetchWithAuth(`/api/rooms/${roomId}`, {
            method: 'DELETE'
        });
    },
    archiveRoom: async (roomId)=>{
        return fetchWithAuth(`/api/rooms/${roomId}/archive`, {
            method: 'POST'
        });
    },
    unarchiveRoom: async (roomId)=>{
        return fetchWithAuth(`/api/rooms/${roomId}/unarchive`, {
            method: 'POST'
        });
    },
    addRoomMember: async (roomId, userId, role)=>{
        return fetchWithAuth(`/api/rooms/${roomId}/members`, {
            method: 'POST',
            body: JSON.stringify({
                userId,
                role
            })
        });
    },
    removeRoomMember: async (roomId, userId)=>{
        return fetchWithAuth(`/api/rooms/${roomId}/members/${userId}`, {
            method: 'DELETE'
        });
    },
    updateRoomMemberRole: async (roomId, userId, role)=>{
        return fetchWithAuth(`/api/rooms/${roomId}/members/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({
                role
            })
        });
    },
    markRoomAsRead: async (roomId)=>{
        return fetchWithAuth(`/api/rooms/${roomId}/read`, {
            method: 'POST'
        });
    },
    searchRooms: async (query)=>{
        return fetchWithAuth(`/api/rooms/search?q=${encodeURIComponent(query)}`);
    },
    // Message endpoints
    getMessages: async ()=>{
        return fetchWithAuth('/api/messages');
    },
    sendMessage: async (content)=>{
        return fetchWithAuth('/api/messages', {
            method: 'POST',
            body: JSON.stringify({
                content
            })
        });
    },
    deleteMessage: async (messageId)=>{
        return fetchWithAuth(`/api/messages/${messageId}`, {
            method: 'DELETE'
        });
    },
    editMessage: async (messageId, content)=>{
        return fetchWithAuth(`/api/messages/${messageId}`, {
            method: 'PUT',
            body: JSON.stringify({
                content
            })
        });
    },
    forwardMessage: async (messageId, content)=>{
        return fetchWithAuth(`/api/messages/${messageId}/forward`, {
            method: 'POST',
            body: JSON.stringify({
                content
            })
        });
    },
    reportMessage: async (messageId, reason)=>{
        return fetchWithAuth(`/api/messages/${messageId}/report`, {
            method: 'POST',
            body: JSON.stringify({
                reason
            })
        });
    },
    // Message reactions
    addReaction: async (messageId, emoji)=>{
        return fetchWithAuth(`/api/messages/${messageId}/reactions`, {
            method: 'POST',
            body: JSON.stringify({
                emoji
            })
        });
    },
    removeReaction: async (messageId, emoji)=>{
        return fetchWithAuth(`/api/messages/${messageId}/reactions/${encodeURIComponent(emoji)}`, {
            method: 'DELETE'
        });
    },
    // File uploads
    uploadFile: async (file)=>{
        const formData = new FormData();
        formData.append('file', file);
        const token = localStorage.getItem('token');
        const headers = new Headers();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/messages/upload`, {
                method: 'POST',
                headers,
                body: formData
            });
            const data = await response.json();
            if (!response.ok) {
                return {
                    error: data.error || 'Failed to upload file'
                };
            }
            return {
                data
            };
        } catch (error) {
            return {
                error: error.message
            };
        }
    },
    uploadVoiceMessage: async (audioBlob)=>{
        const formData = new FormData();
        formData.append('audio', audioBlob, 'voice-message.webm');
        const token = localStorage.getItem('token');
        const headers = new Headers();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/messages/voice`, {
                method: 'POST',
                headers,
                body: formData
            });
            const data = await response.json();
            if (!response.ok) {
                return {
                    error: data.error || 'Failed to upload voice message'
                };
            }
            return {
                data
            };
        } catch (error) {
            return {
                error: error.message
            };
        }
    },
    verifyEmail: async (token)=>{
        return fetchWithAuth(`/api/auth/verify-email/${token}`, {
            method: 'POST'
        });
    },
    resetPassword: async (email)=>{
        return fetchWithAuth('/api/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({
                email
            })
        });
    },
    changePassword: async (oldPassword, newPassword)=>{
        return fetchWithAuth('/api/auth/change-password', {
            method: 'POST',
            body: JSON.stringify({
                oldPassword,
                newPassword
            })
        });
    },
    deleteAccount: async (password)=>{
        return fetchWithAuth('/api/auth/delete-account', {
            method: 'POST',
            body: JSON.stringify({
                password
            })
        });
    }
};
const __TURBOPACK__default__export__ = api;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/context/AuthContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider),
    "getTokenExpirationTime": (()=>getTokenExpirationTime),
    "isTokenExpired": (()=>isTokenExpired),
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const TOKEN_REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
function AuthProvider({ children }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        token: null
    });
    // Initialize auth state from storage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const initializeAuth = {
                "AuthProvider.useEffect.initializeAuth": async ()=>{
                    try {
                        // Only access localStorage on the client side
                        if ("TURBOPACK compile-time truthy", 1) {
                            const storedToken = localStorage.getItem(TOKEN_KEY);
                            const storedUser = localStorage.getItem(USER_KEY);
                            if (storedToken && storedUser) {
                                const user = JSON.parse(storedUser);
                                setState({
                                    user,
                                    token: storedToken,
                                    isAuthenticated: true,
                                    isLoading: false
                                });
                                // Verify token validity
                                await refreshToken();
                                return;
                            }
                        }
                        setState({
                            "AuthProvider.useEffect.initializeAuth": (prev)=>({
                                    ...prev,
                                    isLoading: false
                                })
                        }["AuthProvider.useEffect.initializeAuth"]);
                    } catch (error) {
                        console.error('Failed to initialize auth:', error);
                        setState({
                            "AuthProvider.useEffect.initializeAuth": (prev)=>({
                                    ...prev,
                                    isLoading: false
                                })
                        }["AuthProvider.useEffect.initializeAuth"]);
                    }
                }
            }["AuthProvider.useEffect.initializeAuth"];
            initializeAuth();
        }
    }["AuthProvider.useEffect"], []);
    // Login
    const login = async (credentials)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].login(credentials.email, credentials.password);
            if (response.error) throw new Error(response.error);
            const { user, token } = response.data;
            setState({
                user,
                token,
                isAuthenticated: true,
                isLoading: false
            });
            if (credentials.remember) {
                localStorage.setItem(TOKEN_KEY, token);
                localStorage.setItem(USER_KEY, JSON.stringify(user));
            } else {
                sessionStorage.setItem(TOKEN_KEY, token);
                sessionStorage.setItem(USER_KEY, JSON.stringify(user));
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Successfully logged in');
            router.push('/chat');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.message || 'Failed to login');
            throw error;
        }
    };
    // Register
    const register = async (data)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].register(data.username, data.email, data.password);
            if (response.error) throw new Error(response.error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Registration successful! Please verify your email.');
            router.push('/login');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.message || 'Failed to register');
            throw error;
        }
    };
    // Logout
    const logout = async ()=>{
        try {
            if (state.token) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].logout();
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally{
            setState({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false
            });
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            sessionStorage.removeItem(TOKEN_KEY);
            sessionStorage.removeItem(USER_KEY);
            router.push('/login');
        }
    };
    // Refresh token
    const refreshToken = async ()=>{
        if (!state.token) return;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getProfile();
            if (response.error) throw new Error(response.error);
            setState((prev)=>({
                    ...prev,
                    user: response.data
                }));
        } catch (error) {
            console.error('Token refresh error:', error);
            await logout();
        }
    };
    // Update user
    const updateUser = async (data)=>{
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value])=>{
                if (value !== undefined) {
                    formData.append(key, String(value));
                }
            });
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].updateProfile(formData);
            if (response.error) throw new Error(response.error);
            setState((prev)=>({
                    ...prev,
                    user: {
                        ...prev.user,
                        ...response.data
                    }
                }));
            if (state.token) {
                const userStr = JSON.stringify({
                    ...state.user,
                    ...response.data
                });
                localStorage.setItem(USER_KEY, userStr);
                sessionStorage.setItem(USER_KEY, userStr);
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Profile updated successfully');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.message || 'Failed to update profile');
            throw error;
        }
    };
    // Verify email
    const verifyEmail = async (token)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].verifyEmail(token);
            if (response.error) throw new Error(response.error);
            setState((prev)=>({
                    ...prev,
                    user: {
                        ...prev.user,
                        isVerified: true
                    }
                }));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Email verified successfully');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.message || 'Failed to verify email');
            throw error;
        }
    };
    // Reset password
    const resetPassword = async (email)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].resetPassword(email);
            if (response.error) throw new Error(response.error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Password reset instructions sent to your email');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.message || 'Failed to reset password');
            throw error;
        }
    };
    // Change password
    const changePassword = async (oldPassword, newPassword)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].changePassword(oldPassword, newPassword);
            if (response.error) throw new Error(response.error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Password changed successfully');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.message || 'Failed to change password');
            throw error;
        }
    };
    // Delete account
    const deleteAccount = async (password)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deleteAccount(password);
            if (response.error) throw new Error(response.error);
            await logout();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Account deleted successfully');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.message || 'Failed to delete account');
            throw error;
        }
    };
    const value = {
        ...state,
        login,
        register,
        logout,
        refreshToken,
        updateUser,
        verifyEmail,
        resetPassword,
        changePassword,
        deleteAccount
    };
    // Client-side effects
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            // Set up token refresh interval
            let refreshInterval = null;
            if (state.isAuthenticated) {
                refreshInterval = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL);
            }
            // Set up session timeout
            let timeoutId = null;
            let handleActivity = null;
            if (state.isAuthenticated) {
                const resetTimeout = {
                    "AuthProvider.useEffect.resetTimeout": ()=>{
                        if (timeoutId) clearTimeout(timeoutId);
                        timeoutId = setTimeout(logout, SESSION_TIMEOUT);
                    }
                }["AuthProvider.useEffect.resetTimeout"];
                // Reset timeout on user activity
                handleActivity = ({
                    "AuthProvider.useEffect": ()=>resetTimeout()
                })["AuthProvider.useEffect"];
                window.addEventListener('mousemove', handleActivity);
                window.addEventListener('keydown', handleActivity);
                resetTimeout();
            }
            // Route protection
            const path = window.location.pathname;
            if (!state.isLoading && !state.isAuthenticated) {
                if (path !== '/login' && path !== '/register') {
                    router.push('/login');
                }
            }
            return ({
                "AuthProvider.useEffect": ()=>{
                    if (refreshInterval) clearInterval(refreshInterval);
                    if (timeoutId) clearTimeout(timeoutId);
                    if (handleActivity && state.isAuthenticated) {
                        window.removeEventListener('mousemove', handleActivity);
                        window.removeEventListener('keydown', handleActivity);
                    }
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], [
        state.isAuthenticated,
        state.isLoading,
        router,
        logout,
        refreshToken
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: state.isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
            }, void 0, false, {
                fileName: "[project]/src/context/AuthContext.tsx",
                lineNumber: 339,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/context/AuthContext.tsx",
            lineNumber: 338,
            columnNumber: 9
        }, this) : children
    }, void 0, false, {
        fileName: "[project]/src/context/AuthContext.tsx",
        lineNumber: 336,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "BHYjBLxWJHYjO7GDhtRo3QpLb+Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function isTokenExpired(token) {
    try {
        const [, payload] = token.split('.');
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload.exp * 1000 < Date.now();
    } catch  {
        return true;
    }
}
function getTokenExpirationTime(token) {
    try {
        const [, payload] = token.split('.');
        const decodedPayload = JSON.parse(atob(payload));
        return new Date(decodedPayload.exp * 1000);
    } catch  {
        return null;
    }
}
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/sonner.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Toaster": (()=>Toaster)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const Toaster = ({ ...props })=>{
    _s();
    const { theme = "system" } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        style: {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)"
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sonner.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
};
_s(Toaster, "EriOrahfenYKDCErPq+L6926Dw4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = Toaster;
;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_9f2972ae._.js.map