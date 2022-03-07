import React from "react";
import styles from "./TableCheckbox.module.css";

const IndeterminateCheckbox = React.forwardRef(
  //@ts-ignore
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      //@ts-ignore
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <label className={styles.container}>
        <input
          type="checkbox"
          //@ts-ignore
          ref={resolvedRef}
          {...rest}
        />
        <span className={styles.checkmark}></span>
      </label>

      //@ts-ignore
      //   <input type="checkbox" ref={resolvedRef} {...rest} />
    );
  }
);

export default IndeterminateCheckbox;
