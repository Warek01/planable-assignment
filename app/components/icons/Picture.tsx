import type { IconComponent } from '~/types/icon-component';

const Picture: IconComponent = (props) => (
   <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
   >
      <path
         fillRule="evenodd"
         clipRule="evenodd"
         d="M0.875 3.5C0.875 2.05025 2.05025 0.875 3.5 0.875H12.5C13.9497 0.875 15.125 2.05025 15.125 3.5V12.5C15.125 13.9497 13.9497 15.125 12.5 15.125H3.5C2.05025 15.125 0.875 13.9497 0.875 12.5V3.5ZM3.5 2.125C2.74061 2.125 2.125 2.74061 2.125 3.5V12.5C2.125 12.6481 2.14841 12.7907 2.19174 12.9244L9.35095 5.76516C9.98555 5.13056 11.0144 5.13056 11.649 5.76517L13.875 7.99112V3.5C13.875 2.74061 13.2594 2.125 12.5 2.125H3.5ZM13.875 9.75888L10.7652 6.64905C10.6187 6.5026 10.3813 6.5026 10.2348 6.64905L3.07562 13.8083C3.20928 13.8516 3.35191 13.875 3.5 13.875H12.5C13.2594 13.875 13.875 13.2594 13.875 12.5V9.75888ZM6.5 5C6.5 5.82843 5.82843 6.5 5 6.5C4.17157 6.5 3.5 5.82843 3.5 5C3.5 4.17157 4.17157 3.5 5 3.5C5.82843 3.5 6.5 4.17157 6.5 5Z"
         fill="#5E6166"
      />
   </svg>
);

export default Picture;
