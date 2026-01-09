import React, { useEffect, useState } from "react";
import CollectionHeader from "../components/collection/CollectionHeader";
import CollectionInfo from "../components/collection/CollectionInfo";
import CollectionItems from "../components/collection/CollectionItems";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CollectionPage() {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [itemList, setItemList] = useState([])
  const [loading, setLoading] = useState(false);

 async function fetchCollection() {
    try {
      const { data } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/collection/${id}`
      );

      const collectionData = data.data;


      setCollection(collectionData);

      setItemList(collectionData.items)

      console.log(collectionData.items)

      setLoading(false);
    } catch (error) {
      alert(error);
    }
  } 

  useEffect(() => {
    fetchCollection();
    setLoading(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <button onClick={() => setLoading(!loading)}>button</button>
      <CollectionHeader collection={collection} loading={loading} />
      <CollectionInfo collection={collection} loading={loading} />
      <CollectionItems itemList={itemList} setItemList={setItemList} loading={loading} />
    </>
  );
}
