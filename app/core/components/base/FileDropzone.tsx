import { Box, useMantineTheme, Text, Group, Image, Center, ActionIcon, Stack } from "@mantine/core"
import React, { useEffect, useMemo } from "react"
import { useDropzone } from "react-dropzone"

import { FaImage } from "@react-icons/all-files/fa/FaImage"
import { FiUpload } from "@react-icons/all-files/fi/FiUpload"
import { VscChromeClose } from "@react-icons/all-files/vsc/VscChromeClose"

const baseStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  outline: "none",
  cursor: "pointer",
  border: "1px solid",
}

const thumb: React.CSSProperties = {
  display: "inline-flex",
  borderRadius: 8,
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
}

const thumbImg: React.CSSProperties = {
  display: "block",
  width: "100%",
  maxWidth: "85%",
  height: "auto",
}

export type filesType = { preview: string; name: string; id: string }[]

interface IFileDropzone {
  text: string
  files: filesType
  maxFiles?: number
  maxSize?: number
  warning?: string
  onChange: (files: filesType) => void
}

const FileDropzone = ({ text, files, onChange, maxFiles, maxSize, warning }: IFileDropzone) => {
  // const [errorFiles, setErrorFiles] = useState<{ preview: string; name: string, id: string }[]>([]);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const filteredFiles: typeof acceptedFiles = []
      // const duplicateFiles = [];
      for (let i = 0; i < acceptedFiles.length; i += 1) {
        const file = acceptedFiles[i]
        if (file) {
          const fileID = file.lastModified.toString() + file.size.toString()
          let isFileUnique = true
          for (let j = 0; j < files.length; j += 1) {
            if (files[j]?.id === fileID) {
              isFileUnique = false
              break
            }
          }
          if (isFileUnique) filteredFiles.push(file)
        }
        // else duplicateFiles.push(file);
      }

      onChange([
        ...files,
        ...filteredFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: file.lastModified.toString() + file.size.toString(),
          })
        ),
      ])
    },
    maxFiles: maxFiles || 10,
    maxSize: maxSize || 5 * 1024 ** 2,
  })

  // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  useEffect(() => () => files.forEach((file) => URL.revokeObjectURL(file.preview)), [])

  const theme = useMantineTheme()
  const style = useMemo<React.CSSProperties>(() => {
    const dark = theme.colorScheme === "dark"
    return {
      ...baseStyle,
      backgroundColor: dark ? theme.colors.dark[5] : theme.white,
      borderColor: dark ? "transparent" : theme.colors.gray[4],
      ...(isFocused
        ? {
            borderColor: theme.colors.blue[3],
          }
        : {}),
      ...(isDragAccept
        ? {
            backgroundColor: theme.colors.green[3],
            color: theme.black,
          }
        : {}),
      ...(isDragReject
        ? {
            backgroundColor: theme.colors.red[4],
            color: theme.black,
          }
        : {}),
    }
  }, [isFocused, isDragAccept, isDragReject, theme])

  const deleteFile = (id: string) => {
    onChange(files.filter((file) => file.id !== id))
  }

  return (
    <div className="container">
      <Box
        {...getRootProps({ style })}
        sx={() => ({
          borderColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[2],
          borderRadius: theme.radius.sm,
        })}
      >
        <input {...getInputProps()} />
        <Stack py={64} justify="center" spacing={0} px="xl">
          <Group position="center" mb="lg">
            {isDragReject && <VscChromeClose size={24} />}
            {isDragAccept && <FiUpload size={24} />}
            {!isDragAccept && !isDragReject && <FaImage size={24} />}
            <Text weight="bold" size="lg">
              {text}
            </Text>
          </Group>
          {warning ? <Text>{warning}</Text> : <></>}
        </Stack>
      </Box>
      {files.length ? (
        <>
          <Text weight="bold" size="lg" mt="sm" mb="xs">
            Preview:
          </Text>
          <Group spacing="xs">
            {files.map((file, i) => (
              <Center
                style={{ ...thumb, position: "relative" }}
                sx={() => ({
                  backgroundColor:
                    theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
                })}
                key={file.name + i.toString()}
              >
                <Image style={thumbImg} src={file.preview} alt={file.name} />
                <ActionIcon
                  onClick={() => deleteFile(file.id)}
                  size="xs"
                  variant="filled"
                  color="red"
                  style={{ position: "absolute", right: "8px", top: "8px" }}
                >
                  <VscChromeClose />
                </ActionIcon>
              </Center>
            ))}
          </Group>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default FileDropzone
