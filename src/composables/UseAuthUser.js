// File with our user autentication logical
// Usable for define methods for this logic
// When modifiyng database for user , just add new composable or alter this file, without change the code structure

import {ref} from 'vue'
import useSupaBase from "src/boot/supabase"

// Create global state ofr import this composable and get access to this user
const user = ref(null)

export default function useAuthUser(){

  //Use supabase library ofr implement functions on methods
  const {supabase} = useSupaBase()

  // Common login with registered user in database
  const login = async ({email, password}) =>{

    //Get user or error when try log in
    const{user, error} = await supabase.auth.signIn({email, password})

    if(error) throw error
    return user
  }

  // Login with social media accounts , like facebook, google  etc.
  const loginWithSocialProvider = async(provider) =>{
        const{user, error} = await supabase.auth.signIn({provider})
        if(error) throw error
        return user
  }

  // Logout currently user
  const logout = async() =>{
    const{error} = await supabase.auth.signOut()
    if(error) throw error
  }

  //Verify the log state user, if the already logged in
  const isLoggedIn = () =>{
    return !!user.value
  }

  // Create new user
  const register = async ({email, password, ...meta}) => {

    // Return user after logged in or error in registration
    const {user, error} = await supabase.auth.signUp(
      {email, password},

      //Redirect to login page informing tha the user needs to confirm email
      {
        data: meta,
        redirectTo: '${window.location.origin}/loginPg?fromEmail=registrationConfirmation'
      }
    )
    if(error) throw error
    return user
  }

  // For update login information
  const update = async (data) => {
    const {user, error} = await supabase.auth.update(data)
    if(error) throw error
    return user
  }

  //Method for reset password
  const sendPasswordRestEmail = async(email) =>{
    const {user, error} = await supabase.auth.api.resetPasswordForEmail(email)
    if(error) throw error
    return user
  }

  // Method for receive a acces token for changing password after recevei an email for that
  const resetPassword = async (accessToken, newPassword) => {
    const{user, error} = await supabase.auth.api.updateUser(
      accessToken,
      {password: newPassword}
    )
    if(error) throw error
    return user
  }

  //return all methods to enable then
  return{
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    resetPassword
  }
}
