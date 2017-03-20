export enum STATUS {
    'Logged' = 1,      // start from 1, not 0
    'Recreated',
    'In Progress',
    'Fixed',
    'Declined'
}

export enum SEVERITY {
    'Severe' = 1,
    'Medium',
    'Low',
    'Cosmetic'
}