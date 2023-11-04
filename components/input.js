import { stations3 } from "@/data/stations"
import { isMatch } from "@/util/input"
import { useSearchRadius, useStation } from "@/util/state"
import { Box, Button, Flex, Input, Text } from "@kuma-ui/core"
import { useEffect, useRef, useState } from "react"

export const StationInput = (props) => {
  const ref = useRef(null)
  const [station, setStation] = useStation()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [text, setText] = useState(station.name)

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
    setStation(stations3.find(station => station.id == e.target.dataset.id))
    setText(e.target.dataset.name)
    setHidden(true)
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      ref.current.focus()
    }
  }, [open])

  return (
    <Box
      position="relative"
    >
      <Text
        onClick={onOpenDialog}
        cursor="pointer"
        border="1px solid lightgray"
        backgroundColor="white"
        width="300px"
        height="24px"
      >
        {station.name}
      </Text>
      <Box
        hidden={!open}
        backgroundColor="white"
        border="1px solid gray"
        width="300px"
        height="300px"
        position="absolute"
        top="0px"
        left="0px"
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
          height="270px"
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
              backgroundColor={name == station.name ? "bisque" : "inherit"}
            >
              {name}
            </Box>
          ))}

        </Box>

      </Box>
    </Box>
  )
}

export const RadiusInput = () => {
  const [searchRadius, setSearchRadius] = useSearchRadius()
  const onTextChange = (e) => {
    setSearchRadius(e.target.value)
  }
  return (<Input
    border="1px solid lightgray"
    max="5000"
    min="0"
    type="number"
    backgroundColor="white"
    width="300px"
    height="24px"
    value={searchRadius}
    onChange={onTextChange}
  />)
}