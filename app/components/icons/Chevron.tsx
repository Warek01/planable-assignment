import type { IconComponent } from '~/types/icon-component';

const Chevron: IconComponent = (props) => (
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
         d="M7.55806 5.55806C7.80214 5.31398 8.19786 5.31398 8.44194 5.55806L11.9419 9.05806C12.186 9.30214 12.186 9.69786 11.9419 9.94194C11.6979 10.186 11.3021 10.186 11.0581 9.94194L8 6.88388L4.94194 9.94194C4.69786 10.186 4.30214 10.186 4.05806 9.94194C3.81398 9.69786 3.81398 9.30214 4.05806 9.05806L7.55806 5.55806Z"
         fill="#9FA4AB"
      />
   </svg>
);

export default Chevron;
