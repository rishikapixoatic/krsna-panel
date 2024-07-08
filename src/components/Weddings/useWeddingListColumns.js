import { useMemo } from "react";
import trashIcon from './../../assests/trash-solid.svg';

const useWeddingListColumns = ({handleDeleteAction}) => {

    const Columns = useMemo(() => [
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Cover Picture",
            accessor: "thumbnail",
            Cell: ({ cell: { value } }) => (
                <div className="w-16 h-16">
                  <img src={value} alt="Cover" className="object-cover w-full h-full rounded-md" />
                </div>
              )
        },
        {
            Header: "Action 1",
            accessor: "action",
            Cell: ({ row }) => {
                return (
                    <div className="flex justify-center items-center" onClick={(e) => handleDeleteAction(e, row?.original?.name)}>
                        <img src={trashIcon} alt="action" className="h-4 w-4 mr-5" />
                    </div>
                )
            }
        },
    ], [handleDeleteAction]);

    return Columns;
}

export default useWeddingListColumns;
