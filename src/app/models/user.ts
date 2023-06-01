export interface UserList {
    id: string,
    title: string,
    firstName: string,
    lastName: string,
    picture: string
}
  
export interface User {
    id?: string,
    title: string,
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    dateOfBirth: string,
    registerDate?: string,
    phone: string,
    picture: string,
    location?: {}
}

export interface UserResult {
    data: UserList[], 
    limit: number, 
    page: number, 
    total: number
}