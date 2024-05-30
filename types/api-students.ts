export interface APIStudents {
    Current: {
        Department: string,
        Students: {
            ID: number,
            MatricNumber: string,
            Name: string,
            LevelClass: string,
            PortFolio?: string,
            Gender: string,
            Department?: string
        }[],
    }[],
}

export enum STUDENTS {
    'Computer Science',
    'Information Technology',
    'Library and Information Science',
    'Mass Communication',
    'Telecommunication Science'
}