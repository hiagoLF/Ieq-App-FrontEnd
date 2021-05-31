import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const RenderItensInColumns = ({ columns, data, renderItems }) => {

    // State...........................
    const [table, tableTable] = useState([])

    // Effect.......................
    useEffect(() => {
        // Abrir um contador de quantos valores de data já foram percorridos
        var count = 0
        // Pegar o número de linhas necessárias
        const linesNumber = Math.ceil(columns / data.length)
        // Abrir um novo array dataFormated
        const dataFormated = []
        // Fazer um FOR que dá o número de voltas equivalente a linesNumber
        for (var i = 0; i <= linesNumber; i++) {
            // Para cada volta...
            // Abrir um novo array lineData
            const lineData = []
            // Criar um for com número de voltas equivalente a columns
            for (var b = 0; b < columns; b++) {
                // Para cada volta...
                // Colocar neste array, uma valor de data
                if (count < data.length) {
                    lineData.push(data[count])
                    count++
                } else {
                    break
                }
            }
            // Colocar lineData dentro de dataFormated
            dataFormated.push(lineData)
        }
        // salvar dataFormated em um estado
        tableTable(dataFormated)
    }, [])

    return (
        <TableContainer>
            {table.map((line, k) => (
                <TableLine key={k}>
                    {line.map((item, k) =>
                        <ItemContainer key={k}>
                            {renderItems(item)}
                        </ItemContainer>
                    )}
                </TableLine>
            ))}
        </TableContainer>
    )
}

const TableContainer = styled.View`
    width: 95%;
`;

const TableLine = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const ItemContainer = styled.View`
    width: 33.3%;
    justify-content: center;
    align-items: center;
`;

export default RenderItensInColumns;