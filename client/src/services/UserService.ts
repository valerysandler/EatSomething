
export const getUsers = async () => {
    try {
        const response = await fetch('http://localhost:3000/users'); // Adjust the API endpoint as needed
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export const createUser = async (user: { name: string; email: string }) => {
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            console.error('Failed to create user:', response.statusText);
            throw new Error(`Failed to create user: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('User created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}


