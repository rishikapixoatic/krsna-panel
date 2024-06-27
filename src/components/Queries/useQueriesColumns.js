import React, { useMemo } from "react";
import eyesolid from './../../assests/eye-solid.svg';
import replysolid from './../../assests/reply-solid.svg';

const useQueriesColumns = ({ handleAction1Click, handleAction2Click }) => {

    const Columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "messageId"
        },
        {
            Header: "Subject",
            accessor: "message"
        },
        {
            Header: "Action 1",
            accessor: "action",
            Cell: ({ row }) => {
                return (
                        <div className="flex justify-center items-center" onClick={(e) => handleAction1Click(e, row?.original?.messageId, row?.original)}>
                            <img src={eyesolid} alt="action" className="h-4 w-4 mr-5" />
                        </div>
                )
            }
        },
        {
            Header: "Action 2",
            accessor: "action 2",
            Cell: ({ row }) => {
                return (
                        <div className="flex justify-center items-center" onClick={(e) => handleAction2Click(e, row?.original?.messageId, row?.original)}>
                            <img src={replysolid} alt="action" className="h-4 w-4 mr-5" />
                        </div>
                )
            }
        }
    ], [handleAction1Click, handleAction2Click]);

    return Columns;
}

export default useQueriesColumns;
