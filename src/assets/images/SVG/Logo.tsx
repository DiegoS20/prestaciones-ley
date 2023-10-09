const Logo = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={100}
    viewBox="0 0 375 375"
    style={{
      position: "absolute",
      left: "-20%",
      top: "-30px",
    }}
    {...props}
  >
    <defs>
      <clipPath id="a">
        <path d="M286 37.5h60.625V144H286Zm0 0" />
      </clipPath>
      <clipPath id="b">
        <path d="M28.625 197H89v106.75H28.625Zm0 0" />
      </clipPath>
      <clipPath id="c">
        <path d="M28.625 37.5H251V258H28.625Zm0 0" />
      </clipPath>
      <clipPath id="d">
        <path d="M124 83h222.625v220.75H124Zm0 0" />
      </clipPath>
    </defs>
    <g clipPath="url(#a)">
      <path
        fillRule="evenodd"
        d="M286.742 37.5v71.313l59.824 34.515V37.5Zm0 0"
      />
    </g>
    <g clipPath="url(#b)">
      <path
        fillRule="evenodd"
        d="M28.68 303.75h59.765v-71.313L28.68 197.923Zm0 0"
      />
    </g>
    <g clipPath="url(#c)">
      <path
        fillRule="evenodd"
        d="M88.445 37.5H28.68v126.672l59.765 34.516 102.106 58.917 59.762-34.449L88.445 129.66Zm0 0"
      />
    </g>
    <g clipPath="url(#d)">
      <path
        fillRule="evenodd"
        d="m184.7 83.707-59.762 34.45 161.804 93.433v92.16h59.824V177.078l-59.824-34.516Zm0 0"
      />
    </g>
    <path d="M123.745 329.2v-15.727H120.6v6.29h-4.707v-6.29h-3.144V329.2h3.144v-6.293h4.707v6.293ZM145.612 329.2v-15.727h-3.144V329.2ZM164.335 329.2h3.144v-6.16l4.18 6.16h3.894l-5.547-7.965 5.106-7.762h-3.676l-3.957 6.27v-6.27h-3.144ZM191.39 329.2h3.563l.617-1.695h5.215l.636 1.695h3.543l-6.62-16.3h-.333Zm5.324-4.64 1.473-4.094 1.43 4.093ZM230.172 329.2h3.566l-3.652-6.488c4.617-1.344 4.07-9.239-1.54-9.239h-6.202V329.2h3.144v-6.004h1.516Zm-4.684-9.063v-3.52h2.77c2.136 0 2.136 3.52 0 3.52ZM262.288 323.723v-10.25h-3.12V323.7c0 3.3-5.106 3.3-5.106 0v-10.227h-3.145v10.25c0 7.477 11.371 7.477 11.371 0Zm0 0" />
  </svg>
);
export default Logo;
