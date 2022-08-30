import React from "react"

const NoData = (props) => {
    return (<tr>
        <td colSpan={props.span} align="center">
            <h3>{props.message ?? 'No data found'}</h3>
        </td>
    </tr>);
}

export default NoData;