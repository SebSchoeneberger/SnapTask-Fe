import defaultAvatar from ".././assets/defaultAvatar.svg";

export default function DefaultProfileImage({ size }) {
  if (!size || size < 1) size = 1;
  if (size > 20) size = 20;

  return <img src={defaultAvatar} alt="default profile" className={`w-[${size}rem] h-[${size}rem] rounded-full`} />;
}
