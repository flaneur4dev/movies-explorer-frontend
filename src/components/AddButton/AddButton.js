import { memo } from "react";
import './AddButton.css';

const AddButton = props => (
  <>
    {props.count <= props.movies.length &&
      <button
        type="button"
        className="add-button"
        onClick={props.handleClick}
      >
        Еще
      </button>
    }
  </>
)

export default memo(AddButton)
