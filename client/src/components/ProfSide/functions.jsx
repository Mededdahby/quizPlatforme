const API_URL = 'http://localhost:3000';

export const handleLogout = async () => {
    console.log('Logging out');

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    const result = await response.json();
    console.log(result);

    localStorage.removeItem('token');
    window.location.reload();
};

export const authenticateUser = async (userData, setUserData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/isuserauth`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        if (result.access) {
            setUserData(result.data);
        } else {
            console.log('User is not logged in');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const addPost = async (post, setPosts) => {
    const data = {
        post,
        token: localStorage.getItem('token'),
    };

    const response = await fetch(`${API_URL}/post/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log(result);

    getPosts(setPosts);
};

export const getPosts = async (setPosts) => {
    const response = await fetch(`${API_URL}/post`);
    const posts = await response.json();
    setPosts(posts);
};
export const getPostsByCo = async (setPosts, name) => {
    const response = await fetch(`${API_URL}/post/byco/${name}`);
    const posts = await response.json();
    setPosts(posts);
};
export function timeAgo(fromDate) {
    var currentDate = new Date();
    var timeDifference = currentDate.getTime() - fromDate.getTime();
    var seconds = Math.floor(timeDifference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var months = Math.floor(days / 30);
    var years = Math.floor(days / 365);
    if (years > 0) {
        return "".concat(years, " ").concat(years === 1 ? 'year' : 'years', " ago");
    }
    else if (months > 0) {
        return "".concat(months, " ").concat(months === 1 ? 'month' : 'months', " ago");
    }
    else if (days > 0) {
        return "".concat(days, " ").concat(days === 1 ? 'day' : 'days', " ago");
    }
    else if (hours > 0) {
        return "".concat(hours, " ").concat(hours === 1 ? 'hour' : 'hours', " ago");
    }
    else if (minutes > 0) {
        return "".concat(minutes, " ").concat(minutes === 1 ? 'minute' : 'minutes', " ago");
    }
    else {
        return "".concat(seconds, " ").concat(seconds === 1 ? 'second' : 'seconds', " ago");
    }
}

export async function openComments(id, setPostComments, setShowComments) {
    const response = await fetch(`${API_URL}/post/byid/${id}`);
    const post = await response.json();
    setShowComments(true)
    setPostComments(post)
}

export async function addNewComment(e, newComment, postId, setShowComments, setPosts) {
    e.preventDefault();
    const data = {
        comment: newComment,
        token: localStorage.getItem('token'),
        postId
    };
    console.log({ data })

    const response = await fetch(`${API_URL}/comment/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const result = await response.json()
    setShowComments(false)
    getPosts(setPosts)

    console.log({ result })
}



