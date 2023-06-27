import React, { useState, useEffect } from 'react';

function Note({keyProp, polishText, foreignText}) {
    return (
        <tr key={keyProp}>
            <td>{polishText}</td>
            <td>{foreignText}</td>
        </tr>
    )
}

export default Note;