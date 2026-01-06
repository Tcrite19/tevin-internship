import React, { useEffect, useState } from "react";
import axios from "axios";
import CollectionCard from "../components/ui/CollectionCard";
import CollectionCardSkeleton from "../components/ui/CollectionCardSkeleton";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLength, setListLength] = useState(12);

  async function fetchCollections() {
    try {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/collections"
      );

      const collectionsData = data.data;

      setCollections(collectionsData);

      setLoading(false);

    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    fetchCollections();
    setLoading(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1 className="collections-page__title">Collections</h1>
        <div className="collections__body">
          {loading
            ? new Array(12).fill(0).map((_, index) => (
                <div key={index} className="collection-column">
                  <CollectionCardSkeleton />
                </div>
              ))
            : collections?.slice(0, listLength).map((e, index) => (
                <div className="collection-column" key={index}>
                  <CollectionCard collection={e} id={"id"} />
                </div>
              ))}
        </div>
        {listLength < collections.length && (
          <button
            className="collections-page__button"
            onClick={() => setListLength(listLength + 6)}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
}
