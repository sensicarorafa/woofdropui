import api from "./server";

export const createUser = async (data: object) => await api.post("/user/save", data);

export const getUser = async (telegramId: Number) => await api.get(`/user/exist?tid=${telegramId}`);

export const addPoints = async (telegramId: Number, points: Number) => await api.put(`/user/add-points`, { points, telegramId });

export const getRefereesPoints = async (referralCode: string) => await api.put(`/user/get-referee-point`, { referralCode });

export const addReferee = async (telegramId: Number, referralCode: string, fullname: string) => await api.put(`/user/add-referee`, { telegramId, referralCode, fullname });

export const getReferees = async (telegramId: Number) => await api.get(`/user/referee?telegramId=${telegramId}`);

export const levelUp = async (telegramId: Number, levelIndex: Number, points: Number) => await api.put(`/user/level-up`, { telegramId, levelIndex, points });

export const getTasks = async (telegramId: Number) => await api.get(`/user/tasks?tid=${telegramId}`);

export const claimTask = async (telegramId: Number, taskId: Number, points: Number) => await api.put(`/user/claim-task`, { telegramId, taskId, points });

export const getLeaderBoard = async () => await api.get(`/user/leaderboard`);

export const getReferralLeaderBoard = async (referralCode: string) => await api.get(`/user/get-referral-leaderboard?referralCode=${referralCode}`, );

export const addGender = async (telegramId: Number, gender: string) => await api.put(`/user/gender`, { telegramId, gender });

export const logFootPrint = async (telegramId: Number, points: Number) => await api.post(`/user/footprint`, { telegramId, points });

export const getFootPrint = async (telegramId: Number) => await api.get(`/user/footprint?tid=${telegramId}`);
