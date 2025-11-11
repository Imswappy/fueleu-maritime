export function canBank(cb: number){ return cb > 0 }
export function canApply(available: number, amount: number){ return amount > 0 && amount <= available }
