import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const CustomDropdownMenu = (props: any) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        個人檔案
        </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>修改密碼</DropdownItem>
        <DropdownItem>推薦朋友</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    );
};

export default CustomDropdownMenu;