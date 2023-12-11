export interface Products {
    _id: string;
    name: string;
    price: number;
    description: string;
}

export interface DataSignUp {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface FormikProduct {
    name: string ;
    price: number;
    description: string;
    categoryId: string;
}

export interface Categories {
    _id: string;
    name: string;
}