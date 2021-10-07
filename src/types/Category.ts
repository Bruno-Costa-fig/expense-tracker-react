export type Category = {
    [tag: string]: {
        title: string;
        color: string;
        expense: boolean;
    }
}

// aqui temos um detalhe: cada categoria tem um nome diferente.
// nesse caso temos que criar uma estrutura que aceite receber esse
// nome e também temos que definir o tipo dele