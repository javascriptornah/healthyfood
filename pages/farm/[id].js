import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import ImageSection from "../../components/farmview/ImageSection";
import EditImageSection from "../../components/farmview/EditImageSection";
import Sections from "../../components/farmview/Sections";
import supabase from "../../utils/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import EditSections from "../../components/farmview/EditSections";
import { toast, Toaster } from "react-hot-toast";
import DeletePopup from "../../components/popups/DeletePopup";
import { deleteLocation } from "../../utils/supabaseFunctions";
const Cont = styled.div`
  background-color: #fff;
  max-width: 1600px;
  margin: 0 auto;
  .header {
    padding: 16px;
    background-color: ${(props) => props.colors.tan};

    @media only screen and (max-width: 300px) {
      padding: 0;
    }
  }
  .red-title-bg {
    border-radius: 0;
  }
  .tag-six {
    width: auto;
    padding: 4px 8px;
    &:first-of-type {
      border-radius: 0;
    }
    &:last-of-type {
      border-radius: 0;
    }
  }
`;

export const getServerSideProps = async (pageContext) => {
  const id = pageContext.query.id;
  const { data, error } = await supabase
    .from("locations")
    .select(
      "*, address(*,state_id(*), country_id(*)), products(*), images(*), user_id(id, username)"
    )
    .eq("id", id)
    .single();
  return {
    props: {
      locationFetch: data,
    },
  };
};

const Preview = ({ locationFetch }) => {
  const [origPoster, setOrigPoster] = useState(false);
  const [user, setUser] = useState("null");
  const [location, setLocation] = useState(locationFetch);
  const [titleText, setTitleText] = useState(location.name);
  const router = useRouter();
  console.log(router.basePath);
  const title = router.query.title;

  const [loading, setLoading] = useState({ state: false, msg: "" });
  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session.session != null) {
        setUser(session.session.user);

        if (session.session.user.id == location?.user_id?.id) {
          setOrigPoster(true);
        }
      }
    };
    fetchUser();
  }, []);

  const [images, setImages] = useState(location?.images || []);

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => {
      return !prev;
    });
  };

  const reFetchLocation = async (id) => {
    const { data, error } = await supabase
      .from("locations")
      .select(
        "*, address(*,state_id(*), country_id(*)), products(*), images(*), user_id(id, username)"
      )
      .eq("id", id)
      .single();

    setLocation(data);
  };
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const showPopup = () => {
    setShowDeletePopup(true);
  };
  const hidePopup = () => {
    setShowDeletePopup(false);
  };

  const deletePost = async () => {
    setLoading({ state: true, msg: "deleting post..." });
    const deleteState = await deleteLocation(location.id);
    if (deleteState == true) {
      setLoading({ state: false, msg: "" });
      toast.success("Post deleted! Rerouting back to home");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      setLoading({ state: false, msg: "" });
      toast.error(`Error deleting post... ${deleteState}`);
    }
  };
  console.log("loca");
  console.log(locationFetch);
  console.log("date");
  console.log();
  let keywords = location.tags.map((tag) => `${tag} near me`).join(",");
  console.log("keywords");
  console.log(keywords);
  const meta = {
    title: location.name,
    description: location.description,
    link: `https://healthyfoodmap.com/farm/`,
    type: "website",
    date: "2023-02-14 15:00:00.000",
    image: locationFetch.images[0] ? locationFetch.images[0] : "/seo/index.PNG",
    keywords: ``,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Healthyfoodmap" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="article:published_time" content={meta.date} />
        <link rel="canonical" href={meta.image} />
        <meta property="og:url" content={meta.link} />
        <meta name="keywords" content={meta.keywords} />

        <meta name="description" content={meta.description} />
      </Head>
      <Cont colors={COLORS} className="default-page">
        {loading.state && (
          <div className="loading-screen">
            <div className="loading-items">
              <div class="lds-ring-green">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p className="bold green">{loading.msg}</p>
            </div>
          </div>
        )}
        {showDeletePopup && (
          <DeletePopup
            text="post"
            deleteFunction={deletePost}
            cancelFunction={hidePopup}
          />
        )}
        <Toaster />
        <div className="header flex flex-wrap space-between align-start">
          <div className="flex align-center mar-bottom-16">
            {!editMode ? (
              <div className="red-title-bg">
                <h3 className="text-shadow">{location.name}</h3>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                  placeholder="title"
                />
              </>
            )}
          </div>
          <div className="flex align-center flex-wrap mar-bottom-16">
            {location.tags.map((tag, index) => (
              <div className="tag-six" key={index}>
                <p className="mar-right-4">{tag}</p>
              </div>
            ))}
          </div>
          {origPoster && (
            <>
              <div
                onClick={toggleEditMode}
                className="black-btn flex-inline cursor align-center"
              >
                <h4 className="mar-right-16">
                  {editMode ? "CANCEL EDIT" : "EDIT"}
                </h4>
                <FontAwesomeIcon icon={faPencil} className=" icon-sm white" />
              </div>
              {editMode && (
                <div onClick={showPopup} className="red-btn-one">
                  <h4>DELETE</h4>
                </div>
              )}
            </>
          )}
        </div>

        {editMode ? (
          <>
            <EditImageSection
              images={images}
              location_id={location.id}
              user_id={user.id}
              post_user_id={location?.user_id?.id || null}
            />
            <EditSections
              products={location.products}
              description={location.description}
              address={location.address[0]}
              website={location.website}
              email={location.email}
              phone={location.number}
              delivery={location.pickup}
              hoursFrom={location.hoursFrom}
              hoursTo={location.hoursTo}
              grassFed={location.grassFed}
              organic={location.organic}
              soyFree={location.soyFree}
              pastureRaised={location.pastureRaised}
              A2={location.A2}
              unfrozen={location.unfrozen}
              pricing={location.pricing}
              quality={location.quality}
              friendly={location.friendly}
              howToOrder={location.howToOrder}
              location_id={location.id}
              reFetchLocation={reFetchLocation}
              setEditMode={setEditMode}
              titleText={titleText}
            />
          </>
        ) : (
          <>
            <ImageSection
              images={images}
              location_id={location.id}
              user_id={user.id}
              post_user_id={location.user?.id || null}
            />
            <Sections
              products={location.products}
              description={location.description}
              address={location.address[0].full_address}
              coords={{
                lat: location.address[0].lat,
                lng: location.address[0].lng,
              }}
              small_address={location.address[0].text_address}
              website={location.website}
              email={location.email}
              phone={location.number}
              delivery={location.pickup}
              hoursFrom={location.hoursFrom}
              hoursTo={location.hoursTo}
              grassFed={location.grassFed}
              organic={location.organic}
              vaccineFree={location.vaccineFree}
              soyFree={location.soyFree}
              pastureRaised={location.pastureRaised}
              A2={location.A2}
              unfrozen={location.unfrozen}
              pricing={location.pricing}
              quality={location.quality}
              friendly={location.friendly}
              howToOrder={location.howToOrder}
            />
          </>
        )}
      </Cont>
    </>
  );
};

export default Preview;
