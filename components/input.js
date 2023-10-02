'use client'

import { stations3 } from "@/data/stations"
import { isMatch } from "@/util/input"
import { Box, Button, Flex, HStack, Input, Text, css } from "@kuma-ui/core"
import { useEffect, useRef, useState } from "react"

export const StationInput = ({ value, setValue }) => {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [text, setText] = useState(value)

  const onOpenDialog = (e) => {
    setOpen(true)
    ref.current.focus()
  }

  const onFocus = () => {
    setHidden(false)
  }

  const onBlur = () => {
    // setHidden(true)
    // setOpen(false)
  }

  const onClose = () => {
    setHidden(true)
    setOpen(false)
  }

  const onTextChange = (e) => {
    setText(e.target.value)
  }

  // onClickだとonBlurより順序が遅い
  const onSelectText = (e) => {
    setValue(e.target.dataset.name)
    setText(e.target.dataset.name)
    setHidden(true)
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      ref.current.focus()
    }
  }, [open])

  return (<>
    <Text
      onClick={onOpenDialog}
      cursor="pointer"
      border={"1px solid lightgray"}
      backgroundColor="white"
      width="300px"
      height="24px"
    >
      {value}
    </Text>
    <Box
      hidden={!open}
      backgroundColor="white"
      border="1px solid gray"
      width="300px"
      height="300px"
    >
      <Flex
      >
        <Input
          value={text}
          onChange={onTextChange}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}
          // width="216px"
          height="30px"
          borderRadius="initial"
          flexGrow="1"

        />
        <Button
          onClick={onClose}
        >
          閉じる
        </Button>
      </Flex>
      <Box
        height="264px"
        overflow="scroll"
        // border="1px solid lightgray"
        hidden={hidden}
      >
        {stations3.filter(({ kanji, kana, name }) => isMatch(kanji, kana, name, text)).map(({ id, name }) => (
          <Box
            key={id}
            height="40px"
            lineHeight="40px"
            _hover={{
              backgroundColor: "antiquewhite",
              cursor: "pointer"
            }}
            //   className={css`
            //     @media (hover: hover) {
            //       background-color: antiquewhite;
            //       cursor: pointer;
            //     }
            //     @media (hover: none) {
            //       background-color: inherit;
            //       cursor: inherit;                    
            //     }
            //  `}
            onMouseDown={onSelectText}
            data-id={id}
            data-name={name}
            backgroundColor={name == value ? "bisque" : ""}
          >
            {name}
          </Box>
        ))}

      </Box>

    </Box>
  </>)
}