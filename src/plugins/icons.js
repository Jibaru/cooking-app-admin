import { library } from "@fortawesome/fontawesome-svg-core";
import * as FasIcons from "@fortawesome/free-solid-svg-icons";
import * as FarIcons from "@fortawesome/free-regular-svg-icons";

const addIcons = () => {
  const selectedFasIcons = Array.from([
    FasIcons.faUser,
    FasIcons.faTimes,
    FasIcons.faUtensilSpoon,
    FasIcons.faFileAlt,
    FasIcons.faClipboardCheck,
    FasIcons.faHeart,
    FasIcons.faAppleAlt,
    FasIcons.faEnvelope,
    FasIcons.faCapsules,
    FasIcons.faGlobeAmericas,
    FasIcons.faBook,
    FasIcons.faTags,
    FasIcons.faEye,
    FasIcons.faEdit,
    FasIcons.faExchangeAlt,
    FasIcons.faBan,
    FasIcons.faKey,
    FasIcons.faPaperPlane,
  ]);

  const selectedFarIcons = Array.from([FarIcons.faHeart]);

  library.add([...selectedFasIcons, ...selectedFarIcons]);
};

export { addIcons };
