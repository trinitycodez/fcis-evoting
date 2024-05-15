export interface APIStudents {
    Current: {
        Department: string,
        Students: {
            id: number,
            matricNo: string,
            name: string,
            level: string,
            position?: string,
            gender: string
        }[],
    }[],
}