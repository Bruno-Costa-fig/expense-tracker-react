import styled from "styled-components";

export const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    margin-top: 20px;
`;

// o ? no type da prop marca que ela é opcional. Importante lembrar
// que o styled components aceita props
export const TableHeaderColumn = styled.th<{width?: number;}>`
    width: ${props => props.width ? `${props.width}px` : 'auto'};
    padding: 10px 0;
    text-align: left;
`;