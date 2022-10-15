import { Group, Avatar, Text, Stack } from "@mantine/core"
import { User } from "@prisma/client"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"
import { FiTwitter } from "@react-icons/all-files/fi/FiTwitter"
import ProfileGeneral from "./ProfileGeneral"

const Profile = ({ user }: { user: User }) => {
  return <ProfileGeneral user={user} />
}

export default Profile
