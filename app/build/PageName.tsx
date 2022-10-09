import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import {
  HoverCard,
  Group,
  ScrollArea,
  Stack,
  Button,
  Tooltip,
  ActionIcon,
  TextInput,
  Text,
} from "@mantine/core"
import { useClickOutside } from "@mantine/hooks"
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit"
import { AiOutlineLink } from "@react-icons/all-files/ai/AiOutlineLink"
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown"
import { IoMdCheckmark } from "@react-icons/all-files/io/IoMdCheckmark"
import updatePage from "app/build-pages/mutations/updatePage"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { useState, useEffect, useMemo } from "react"
import { AppStore } from "store"
import { BuildStore } from "store/build"
import PageLink from "./PageLink"

const PageName = observer(() => {
  const {
    data: { name, id, customID, isPublished },
  } = BuildStore

  const [inputVisible, setInputVisible] = useState(false)
  const [editName, setEditName] = useState(name)
  const editNameOutsideRef = useClickOutside(() => setInputVisible(false))
  const [updatePageMutation, { isLoading: isUpdatingPage, isSuccess: hasSuccessfullyUpdatedPage }] =
    useMutation(updatePage)

  useEffect(() => {
    setEditName(name)
  }, [name])

  const current = useMemo(() => {
    return AppStore.pages?.find((p) => p.id === id)
  }, [id])

  const rest = useMemo(() => {
    return current ? AppStore.pages.filter((p) => p.id !== current.id) : undefined
  }, [current])

  useEffect(() => {
    if (hasSuccessfullyUpdatedPage) {
      setInputVisible(false)
      if (editName) {
        BuildStore.data.name = editName
        if (current) {
          current.name = editName
        }
      }
    }
  }, [hasSuccessfullyUpdatedPage])

  const { t } = useTranslation("build")

  return (
    <HoverCard shadow="lg" width={312} openDelay={300}>
      <HoverCard.Target>
        <Group align="center" spacing={4}>
          {isPublished && <AiOutlineLink />}
          <Text>{name}</Text>
          <FiChevronDown />
        </Group>
      </HoverCard.Target>
      <HoverCard.Dropdown p={8} style={{ overflow: "hidden" }}>
        <ScrollArea.Autosize
          maxHeight={160}
          type="never"
          offsetScrollbars
          styles={{ viewport: { padding: 0 } }}
        >
          {current && (
            <Stack spacing={4}>
              <Text weight="bold">{t("currentPage")}:</Text>
              {id && isPublished && <PageLink id={customID || id} withEllipsis={true} />}

              <Group noWrap spacing={4} mb="sm">
                {!inputVisible ? (
                  <>
                    <Button
                      variant="light"
                      size="xs"
                      fullWidth
                      disabled
                      rightIcon={isPublished ? <AiOutlineLink /> : undefined}
                    >
                      {current.name}
                    </Button>
                    <Tooltip
                      label={t("edit site name")}
                      position="bottom"
                      withArrow
                      withinPortal
                      zIndex={301}
                    >
                      <ActionIcon
                        color="dark"
                        variant="filled"
                        size={30}
                        onClick={() => {
                          setInputVisible(true)
                        }}
                      >
                        <AiOutlineEdit />
                      </ActionIcon>
                    </Tooltip>
                  </>
                ) : (
                  <Group spacing={4} ref={editNameOutsideRef} noWrap style={{ width: "100%" }}>
                    <TextInput
                      size="xs"
                      value={editName || ""}
                      onChange={(evt) => {
                        setEditName(evt.currentTarget.value)
                      }}
                      maxLength={32}
                      sx={{ width: "100%", flexGrow: 1 }}
                    />
                    <ActionIcon
                      color="dark"
                      size={30}
                      disabled={editName === name || !editName?.length}
                      loading={isUpdatingPage}
                      onClick={() => {
                        if (id && editName?.length) {
                          void updatePageMutation({ name: editName, id })
                        }
                      }}
                    >
                      <IoMdCheckmark />
                    </ActionIcon>
                  </Group>
                )}
              </Group>
              {rest && rest.length > 0 ? (
                <>
                  <Text weight="bold">{t("otherPages")}:</Text>
                  {rest.map((p) => (
                    <Link passHref href={`/build/${p.id}`} key={p.id}>
                      <Button
                        variant="light"
                        size="xs"
                        component="a"
                        rightIcon={p.isPublished ? <AiOutlineLink /> : undefined}
                      >
                        {p.name}
                      </Button>
                    </Link>
                  ))}
                </>
              ) : (
                <Text size="sm">{t("otherPagesWillBeHere")}</Text>
              )}
            </Stack>
          )}
        </ScrollArea.Autosize>
      </HoverCard.Dropdown>
    </HoverCard>
  )
})

export default PageName
