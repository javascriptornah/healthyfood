import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClose,
  faStar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { getHours } from "../../utils/functions";
const Cont = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  grid-template-rows: minmax(300px, 1fr);
  @media only screen and (max-width: 900px) {
    grid-template-rows: repeat(4, auto);
    align-items: start;
    grid-template-columns: 1fr;
    & > section:nth-of-type(3) {
      background: #fff !important;
    }
    & > section:nth-of-type(4) {
      background: ${(props) => props.colors.lightBeige} !important;
    }
  }
  .reverse {
    grid-column: 1;
    grid-row: 2;
  }
  section {
    padding: 32px;
    @media only screen and (max-width: 460px) {
      padding: 16px;
    }
  }
  .section {
    width: 100%;
    display: flex;

    background-color: #fff;
    &:nth-of-type(2) {
      background-color: ${(props) => props.colors.lightBeige};
    }
    & > div {
      flex: 1;
    }
    & > div:nth-of-type(1) {
      border-right: 1px solid ${(props) => props.colors.black};
      padding-right: 16px;
    }
    & > div:nth-of-type(2) {
      padding-left: 16px;
    }
    @media only screen and (max-width: 460px) {
      flex-direction: column;
      & > div:nth-of-type(1) {
        border-right: none;
        padding-right: 0;
        border-bottom: 1px solid ${(props) => props.colors.black};
        padding-bottom: 32px;
      }
      & > div:nth-of-type(2) {
        padding-left: 0;
        padding-top: 32px;
      }
    }
  }
  .products-holder-2 {
    max-height: 800px;
    overflow-y: auto;
  }
  .product-item {
    border-bottom: 1px solid ${(props) => props.colors.grey};
    padding-bottom: 16px;
    margin-bottom: 16px;
    h5 {
      margin-right: 8px;
    }

    .product-content {
      display: flex;
      justify-content: space-between;
      h5::before {
        content: "•";
        margin-right: 4px;
      }

      flex-wrap: wrap;
    }

    .price {
      background-color: #fff;
    }
  }
  .description-text {
    padding: 8px;
    max-height: 800px;
    overflow-y: auto;
  }
  .section-line {
    border-bottom: 1px solid ${(props) => props.colors.grey};
    padding-bottom: 8px;
    margin-bottom: 16px;
    word-break: break-word;
  }
  .farm-field-holder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .farm-field-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    max-width: 240px;
  }

  .farm-field-icon {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    display: inline-flex;

    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => props.colors.darkPink};
    background-color: ${(props) => props.colors.tan};
  }

  .star-field-holder {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .star-field {
    display: flex;
    flex-direction: column;

    align-items: center;
    border: 1px solid ${(props) => props.colors.darkPink};
    background-color: #fff;
    padding: 8px;
    margin-bottom: 32px;
    .star-holder {
      display: flex;
      padding: 4px;
      border: 1px solid ${(props) => props.colors.darkPink};
      .star {
        margin-right: 2px;
        margin-left: 2px;
      }
    }
  }
`;

const Sections = ({
  products,
  description,
  address,
  website,
  email,
  phone,
  delivery,
  hoursFrom,
  hoursTo,
  howToOrder,
  grassFed,
  organic,
  vaccineFree,
  soyFree,
  pastureRaised,
  A2,
  unfrozen,
  pricing,
  quality,
  friendly,
  coords,
  small_address,
}) => {
  const [productElems, setProductElems] = useState(
    products.map((product, index) => {
      return (
        <li key={index} className="product-item">
          <div className=" product-content">
            <h5 className="black mar-right-8">{product.name}</h5>

            <p className="price">
              ${product.price} {product.dollarType}/{product.measurement}
            </p>
          </div>
        </li>
      );
    })
  );

  const [farmFields, setFarmFields] = useState(
    [
      { name: "Grassfed", value: grassFed },
      { name: "Organic", value: organic },
      { name: "Vaccine Free", value: vaccineFree },
      { name: "Soy Free", value: soyFree },
      { name: "Pasture Raised", value: pastureRaised },
      { name: "A2", value: A2 },
      { name: "Unfrozen", value: unfrozen },
    ]
      .filter((field) => field.value != "unspecified")
      .map((field, index) => {
        return (
          <div key={index} className="farm-field-line">
            <h5 className="black">{field.name}</h5>
            <div className="farm-field-icon mar-left-16">
              <FontAwesomeIcon
                icon={field.value == "true" ? faCheck : faClose}
                className={
                  field.value == "true" ? "icon-sm green" : "icon-sm light-red"
                }
              />
            </div>
          </div>
        );
      })
  );

  const [starFields, setStarFields] = useState(
    [
      { name: "Pricing", value: pricing },
      { name: "Quality", value: quality },
      { name: "Friendly", value: friendly },
    ].map((field, index) => {
      return (
        <div key={index} className="star-holder mar-bottom-16">
          <h4 className="black mar-bottom-4">{field.name}</h4>
          <div className="star-holder">
            {[1, 2, 3, 4, 5].map((index, realIndex) => {
              return (
                <FontAwesomeIcon
                  key={realIndex}
                  icon={faStar}
                  className={
                    index <= field.value ? "icon-med yellow" : "icon-med black"
                  }
                />
              );
            })}
          </div>
        </div>
      );
    })
  );

  return (
    <Cont colors={COLORS} className="section-holder">
      <section className="section">
        <div>
          <div className="center-inline mar-bottom-16">
            <h4>PRODUCTS</h4>
          </div>
          <ul className="products-holder-2 small-scrollbar">{productElems}</ul>
        </div>
        <div>
          <div className="center-inline mar-bottom-16">
            <h4>DESCRIPTION</h4>
          </div>
          <ReactMarkdown className="description-text small-scrollbar markdown">
            {description}
          </ReactMarkdown>
        </div>
      </section>
      <section className="section">
        <div>
          <div className="section-line">
            <h5 className="black mar-bottom-8">ADDRESS</h5>
            <div className="grey-line mar-bottom-4"></div>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.google.com/maps/place/${small_address}`}
            >
              <p className="bold light-blue underline-hover">{address}</p>
            </a>
          </div>

          <div className="section-line">
            <h5 className="black mar-bottom-8">WEBSITE</h5>
            <div className="grey-line mar-bottom-4"></div>
            <a target="_blank" rel="noreferrer" href={website}>
              <p className="bold light-blue underline-hover">{website}</p>
            </a>
          </div>
          {email !== "" && (
            <div className="section-line">
              <h5 className="black mar-bottom-8">EMAIL</h5>
              <div className="black-line mar-bottom-4"></div>
              <a href={`mailto:${email}`}>
                <p className="bold light-blue underline-hover">{email}</p>
              </a>
            </div>
          )}
          {phone !== "()--" && (
            <div className="section-line">
              <h5 className=" black mar-bottom-8">PHONE</h5>
              <div className="grey-line mar-bottom-4"></div>
              <a href={`tel:${phone}`}>
                <p className="bold light-blue underline-hover">{phone}</p>
              </a>
            </div>
          )}

          <div className="section-line">
            <h5 className=" mar-bottom-8 black">DELIVERY</h5>
            <div className="grey-line mar-bottom-4"></div>
            <p className="bold">{delivery}</p>
          </div>
        </div>
        <div>
          <div className="center-inline">
            <div className="flex align-center justify-center">
              <h4 className="blue mar-right-8">HOURS</h4>
              <FontAwesomeIcon icon={faClock} className="blue icon-sm" />
            </div>
            {!hoursFrom == "" && (
              <p className="bold inline-block">{getHours(hoursFrom)} -</p>
            )}
            {!hoursTo == "" && (
              <p className="bold inline-block">{getHours(hoursTo)}</p>
            )}
          </div>
        </div>
      </section>
      <section className="section" style={{ backgroundColor: "#EEE2DC" }}>
        <div className="farm-field-holder">
          <div>{farmFields}</div>
        </div>
        <div className="star-field-holder align-center">{starFields}</div>
      </section>
      <section style={{ backgroundColor: "#fff" }}>
        <div className="center-inline">
          <h4 className="underline mar-bottom-16">HOW TO ORDER</h4>
        </div>
        <p>{howToOrder}</p>
      </section>
    </Cont>
  );
};

export default Sections;
