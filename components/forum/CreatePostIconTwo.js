import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  .cont {
    background-color: ${(props) => props.colors.tan};
    padding: 4px 8px;
    border-radius: 8px;
  }

  input.input-small {
    max-width: 200px;
    width: 100%;
  }
`;

const CreatePostIcon = () => {
  return (
    <Cont colors={COLORS} className="flex-inline flex-row">
      <div className="cont mar-right-8">
        <Link href={{ pathname: "/createPost", query: { forum: null } }}>
          <input
            type="text"
            className="input-small"
            placeholder="Create Post"
          />
        </Link>
      </div>
    </Cont>
  );
};

export default CreatePostIcon;
