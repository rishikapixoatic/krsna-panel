import React, { useEffect, useState } from 'react';
import { getAllHastag, deleteHastag } from './../../services/WeddingService';
import useWeddingListColumns from './useWeddingListColumns';
import Table from '../Common/Table';

const WeddingList = ({ accessToken }) => {
  const [hastags, setHastags] = useState();

  const getAllHastags = async () => {
    const response = await getAllHastag(accessToken);
    console.log("response..", response);
    setHastags(response.data.hashTags);
  }
  const handleDeleteAction = async(e, name) => {
   console.log("id", name)
   const response = deleteHastag({hashTag: name}, accessToken);
  }
  const weddingListCols = useWeddingListColumns({handleDeleteAction});

  useEffect(() => {
    getAllHastags();
  }, [])

  return (
    <>
     {hastags?.length > 0 && <Table columns={weddingListCols} data={hastags}/>}
    </>
  );
};

export default WeddingList;
