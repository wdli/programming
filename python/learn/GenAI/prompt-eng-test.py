import os
from openai import OpenAI

# Get API key from environment variable
api_key = os.getenv('OPENAI_API_KEY_1')
if not api_key:
    raise ValueError("Please set OPENAI_API_KEY_1 environment variable")

# Initialize OpenAI client
client = OpenAI(api_key=api_key)
"""
This module provides functionality to interact with OpenAI's API.

It handles API key authentication and provides methods to send prompts
to OpenAI's models and receive responses. The module includes error handling
and environment variable configuration.

Dependencies:
    - openai: For interacting with OpenAI API
    - os: For accessing environment variables
    - OpenAI account with available API credits: Required for making API calls

Environment Variables:
    OPENAI_API_KEY_1: API key for OpenAI authentication
"""


def get_openai_response(prompt):
    """
    Send a prompt to OpenAI and get the response
    """
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error occurred: {e}")
        return None

if __name__ == "__main__":
    # Get user input for prompt
    prompt = input("Enter your prompt: ")
    response = get_openai_response(prompt)
    if response:
        print(f"Prompt: {prompt}")
        print(f"Response: {response}")
