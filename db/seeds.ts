import db from "./index"
import { ButtonsList } from "./mocks"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */

// "blitz db seed" to push buttons to database building blocks
const seed = async () => {
  for (let i = 0; i < ButtonsList.length; i++) {
    const block = ButtonsList[i]
    if (block) {
      const { component, editType, props } = block
      block &&
        (await db.buildingBlock.create({
          data: {
            component,
            editType,
            props,
          },
        }))
    }
  }
}

export default seed
