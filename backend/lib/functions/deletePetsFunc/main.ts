import { DynamoDBClient, DeleteItemCommand } from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient()

async function deleteItem(id: string) {
	const params = {
		TableName: process.env.PETS_TABLE_NAME,
		Key: {
			ID: { S: id }, // Assuming ID is the primary key and is of type string. Adjust if needed.
		},
	}

	try {
		const results = await client.send(new DeleteItemCommand(params))
		console.log(`Deleted item with ID: ${id}`)
		return results
	} catch (error) {
		console.error(error)
		throw error
	}
}

exports.handler = async (event: any) => {
	// Assuming the ID is sent in the body as: { "petId": "someValue" }
	const { petId } = JSON.parse(event.body)

	if (!petId) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: 'petId is missing in the request body.',
			}),
		}
	}

	await deleteItem(petId)

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: `Successfully deleted item with petId: ${petId}`,
		}),
	}
}