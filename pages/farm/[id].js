import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
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

const Preview = ({ locationFetch, x }) => {
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

  const description =
    "They sell grass fed beef, pasture raised chicken (fresh) and they also sell fresh organs every few months or so. They do deliveries to the Parkdale market every Saturday between 11:00 AM and 1:30 PM";
  return (
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
      <div className="header flex flex-wrap space-between align-center">
        <div className="flex align-center mar-bottom-16">
          {!editMode ? (
            <h3 className="text-shadow-red mar-right-16">{location.name}</h3>
          ) : (
            <>
              <input
                type="text"
                value={titleText}
                onChange={(e) => setTitleText(e.target.value)}
                placeholder="title"
                style={{ fontSize: "2.827rem" }}
              />
            </>
          )}

          <div className="flex flex-column ">
            <p className="mar-right-4 contrast">
              Posted- {new Date(location.created_at).toDateString()}
            </p>
            <p className="bold">u/{location?.user_id?.username || "anon"} </p>
          </div>
        </div>
        <div className="flex align-center flex-wrap mar-bottom-16">
          <p
            className="inline-block mar-right-8 bold box-shadow-2 white-bg"
            style={{ border: "1px solid #192430", padding: "4px 8px" }}
          >
            Tags
          </p>
          {location.tags.map((tag, index) => (
            <p key={index} className="mar-right-4">
              {tag},
            </p>
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
            vaccineFree={location.vaccineFree}
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
  );
};

export default Preview;
