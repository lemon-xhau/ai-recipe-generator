export function request(ctx) {
    const { ingredients = [] } = ctx.args;

    const prompt = `Suggest a recipe idea using these ingredients: ${ingredients.join(", ")}.`;

    return {
        resourcePath: `/model/openai.gpt-oss-120b-v1:0/invoke`,
        method: "POST",
        params: {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                max_tokens: 1000,
                temperature: 0.7
            }),
        },
    };
}

export function response(ctx) {
    const parsedBody = JSON.parse(ctx.result.body);

    return {
        body: parsedBody.choices[0].message.content,
    };
}