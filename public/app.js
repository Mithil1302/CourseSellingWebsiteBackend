// Utility to render HTML to the #content area
const contentEl = document.getElementById("content");

function render(html){
  contentEl.innerHTML = html;
}

function showMessage(msg, type="success"){
  render(`<div class="message ${type}">${msg}</div>`);
}

// Attach nav listeners
const nav = {
  userSignupBtn: showUserSignup,
  userLoginBtn: showUserLogin,
  coursesBtn: showCourses,
  myCoursesBtn: showMyCourses,
  adminSignupBtn: showAdminSignup,
  adminLoginBtn: showAdminLogin,
  createCourseBtn: showCreateCourse,
  adminCoursesBtn: showAdminCourses
};

Object.entries(nav).forEach(([id, handler]) => {
  const el = document.getElementById(id);
  if(el){
    el.addEventListener("click", handler);
  }
});

/*--------------------------------------------------
  Local storage helpers
--------------------------------------------------*/
function setToken(key, token){
  if(token){
    localStorage.setItem(key, token);
  }
}
function getToken(key){
  return localStorage.getItem(key) || "";
}

/*--------------------------------------------------
  User Signup & Login
--------------------------------------------------*/
function showUserSignup(){
  render(`
    <h2>User Signup</h2>
    <form id="userSignupForm">
      <input name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <input type="number" name="age" placeholder="Age" required />
      <button type="submit">Sign Up</button>
    </form>
  `);
  document.getElementById("userSignupForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData);
    body.age = Number(body.age);
    try{
      const res = await fetch("/user/signup", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(body)
      });
      const data = await res.json();
      if(res.ok){
        showMessage(data.message || "Signup successful");
      }else{
        showMessage(data.message || "Error", "error");
      }
    }catch(err){
      showMessage("Network error", "error");
    }
  });
}

function showUserLogin(){
  render(`
    <h2>User Login</h2>
    <form id="userLoginForm">
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  `);
  document.getElementById("userLoginForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData);
    try{
      const res = await fetch("/user/login", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(body)
      });
      const data = await res.json();
      if(res.ok){
        setToken("userToken", data.token);
        showMessage("Login successful");
      }else{
        showMessage(data.message || "Error", "error");
      }
    }catch(err){
      showMessage("Network error", "error");
    }
  });
}

/*--------------------------------------------------
  Courses
--------------------------------------------------*/
async function fetchCourses(){
  const res = await fetch("/courses");
  if(!res.ok) throw new Error("Failed to load courses");
  const data = await res.json();
  return data.courses || [];
}

async function showCourses(){
  render("<h2>All Courses</h2><p>Loading...</p>");
  try{
    const courses = await fetchCourses();
    if(courses.length === 0){
      render("<p>No courses available.</p>");
      return;
    }
    const html = courses.map(c => `
      <div class="card">
        <h3>${c.title}</h3>
        <p>${c.description}</p>
        <p>Price: $${c.price}</p>
        <button data-id="${c._id}">Purchase</button>
      </div>
    `).join("");
    render(`<h2>All Courses</h2>${html}`);
    document.querySelectorAll("button[data-id]").forEach(btn => {
      btn.addEventListener("click", () => purchaseCourse(btn.dataset.id));
    });
  }catch(err){
    showMessage(err.message, "error");
  }
}

async function purchaseCourse(courseId){
  const token = getToken("userToken");
  if(!token){
    alert("Please login as user first");
    return;
  }
  try{
    const res = await fetch("/user/course/purchase", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization": token
      },
      body:JSON.stringify({courseId})
    });
    const data = await res.json();
    if(res.ok){
      showMessage("Purchase successful");
    }else{
      showMessage(data.message || "Error", "error");
    }
  }catch(err){
    showMessage("Network error", "error");
  }
}

async function showMyCourses(){
  const token = getToken("userToken");
  if(!token){
    alert("Please login as user first");
    return;
  }
  render("<h2>My Purchased Courses</h2><p>Loading...</p>");
  try{
    const res = await fetch("/user/purchases", {
      headers:{
        "Authorization": token
      }
    });
    const data = await res.json();
    if(res.ok){
      const courses = data.courses || [];
      if(courses.length === 0){
        render("<p>You haven't purchased any courses yet.</p>");
        return;
      }
      const html = courses.map(c => `
        <div class="card">
          <h3>${c.name}</h3>
        </div>
      `).join("");
      render(`<h2>My Purchased Courses</h2>${html}`);
    }else{
      showMessage(data.message || "Error", "error");
    }
  }catch(err){
    showMessage("Network error", "error");
  }
}

/*--------------------------------------------------
  Admin Signup & Login
--------------------------------------------------*/
function showAdminSignup(){
  render(`
    <h2>Admin Signup</h2>
    <form id="adminSignupForm">
      <input name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <input type="number" name="age" placeholder="Age" required />
      <button type="submit">Sign Up</button>
    </form>
  `);
  document.getElementById("adminSignupForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData);
    body.age = Number(body.age);
    try{
      const res = await fetch("/admin/signup", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(body)
      });
      const data = await res.json();
      if(res.ok){
        showMessage(data.message || "Signup successful");
      }else{
        showMessage(data.message || "Error", "error");
      }
    }catch(err){
      showMessage("Network error", "error");
    }
  });
}

function showAdminLogin(){
  render(`
    <h2>Admin Login</h2>
    <form id="adminLoginForm">
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  `);
  document.getElementById("adminLoginForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData);
    try{
      const res = await fetch("/admin/login", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(body)
      });
      const data = await res.json();
      if(res.ok){
        setToken("adminToken", data.token);
        showMessage("Login successful");
      }else{
        showMessage(data.message || "Error", "error");
      }
    }catch(err){
      showMessage("Network error", "error");
    }
  });
}

/*--------------------------------------------------
  Admin Create Course & View Courses
--------------------------------------------------*/
function showCreateCourse(){
  const token = getToken("adminToken");
  if(!token){
    alert("Please login as admin first");
    return;
  }
  render(`
    <h2>Create Course</h2>
    <form id="createCourseForm">
      <input name="title" placeholder="Title" required />
      <textarea name="description" placeholder="Description"></textarea>
      <input type="number" name="price" placeholder="Price" required />
      <input name="imageUrl" placeholder="Image URL" />
      <button type="submit">Create</button>
    </form>
  `);
  document.getElementById("createCourseForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData);
    body.price = Number(body.price);
    try{
      const res = await fetch("/admin/create-course", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization": token
        },
        body:JSON.stringify(body)
      });
      const data = await res.json();
      if(res.ok){
        showMessage("Course created successfully");
      }else{
        showMessage(data.message || "Error", "error");
      }
    }catch(err){
      showMessage("Network error", "error");
    }
  });
}

async function showAdminCourses(){
  const token = getToken("adminToken");
  if(!token){
    alert("Please login as admin first");
    return;
  }
  render("<h2>My Created Courses</h2><p>Loading...</p>");
  try{
    const res = await fetch("/admin/created-courses", {
      headers:{
        "Authorization": token
      }
    });
    const data = await res.json();
    if(res.ok){
      const courses = data.courses || [];
      if(courses.length === 0){
        render("<p>You haven't created any courses yet.</p>");
        return;
      }
      const html = courses.map(c => `
        <div class="card">
          <h3>${c.title}</h3>
          <p>${c.description}</p>
          <p>Price: $${c.price}</p>
        </div>
      `).join("");
      render(`<h2>My Created Courses</h2>${html}`);
    }else{
      showMessage(data.message || "Error", "error");
    }
  }catch(err){
    showMessage("Network error", "error");
  }
}

// Initial render
render(`<p>Welcome! Use the navigation above to get started.</p>`);