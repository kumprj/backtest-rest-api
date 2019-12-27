import React from "react";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";
import {API_HEADERS} from "../config";

const row = (x, i, header) =>

    <TableRow key={`tr-${i}`}>
        {header.map((y, k) =>
            <TableRowColumn key={`trc-${k}`}>
                {x[y.prop]}
            </TableRowColumn>
        )}
    </TableRow>;

export default ({data}) =>
    <Table fixedHeader={true}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
                {API_HEADERS.map((x, i) =>
                    <TableHeaderColumn key={`thc-${i}`}>
                        {x.name}
                    </TableHeaderColumn>
                )}
            </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
            {data.map((x, i) => row(x, i, API_HEADERS))}
        </TableBody>
    </Table>;
