import { Icon, IconProps } from "@chakra-ui/react";
import React from "react";

export function FilterIcon(props: IconProps) {
    return (
        <Icon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" fill="currentColor" />
        </Icon>
    )
}