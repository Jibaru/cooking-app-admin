import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import BaseButton from "../components/ui/BaseButton";
import BaseInput from "../components/ui/BaseInput";
import BaseFileInput from "../components/ui/BaseFileInput";
import BaseSelect from "../components/ui/BaseSelect";
import BaseOption from "../components/ui/BaseOption";
import BaseTable from "../components/ui/BaseTable";
import BaseCell from "../components/ui/BaseCell";
import BaseCard from "../components/ui/BaseCard";
import BaseIcon from "../components/ui/BaseIcon";
import BaseModal from "../components/ui/BaseModal";
import BasePopover from "../components/ui/BasePopover";
import BaseSimpleList from "../components/ui/BaseSimpleList";
import BasePagination from "../components/ui/BasePagination";

const addComponents = (app) => {
  app.component("font-awesome-icon", FontAwesomeIcon);

  app.component("base-button", BaseButton);
  app.component("base-input", BaseInput);
  app.component("base-file-input", BaseFileInput);
  app.component("base-select", BaseSelect);
  app.component("base-option", BaseOption);
  app.component("base-table", BaseTable);
  app.component("base-cell", BaseCell);
  app.component("base-card", BaseCard);
  app.component("base-icon", BaseIcon);
  app.component("base-modal", BaseModal);
  app.component("base-popover", BasePopover);
  app.component("base-simple-list", BaseSimpleList);
  app.component("base-pagination", BasePagination);
};

export { addComponents };
