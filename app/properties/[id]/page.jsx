'use client';
import React, {useEffect, useState} from 'react'
import {useParams} from "next/navigation";
import {fetchProperty} from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";
import {FaArrowLeft} from "react-icons/fa";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";
import ShareButtons from "@/components/Share Buttons";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertyPage = () => {
  const {id} = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) {
        return
      }

      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (e) {
        console.error('Error fetching property: ', e);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <>
            <PropertyHeaderImage image={property.images[0]}/>
            <section>
              <div className="container m-auto py-6 px-6">
                <Link
                  href="/properties"
                  className="text-blue-500 hover:text-blue-600 flex items-center"
                >
                  <FaArrowLeft className="mr-2" /> Back to Properties
                </Link>
              </div>
            </section>
            <section className="bg-blue-50">
              <div className="container m-auto py-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                  <PropertyDetails property={property} />

                  { /* <!-- Sidebar --> */ }
                  <aside className="space-y-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
                    >
                      <i className="fas fa-bookmark mr-2"></i> Bookmark Property
                    </button>
                    <ShareButtons property={property} />

                    <PropertyContactForm property={property} />
                  </aside>
                </div>
              </div>
            </section>
            <PropertyImages images={property.images}  />
          </>
        </>
      )}
    </>
  )
}
export default PropertyPage