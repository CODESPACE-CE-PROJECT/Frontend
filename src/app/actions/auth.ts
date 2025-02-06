'use server'

import { deleteSession } from '@/app/lib/session'
import { redirect } from 'next/navigation'

export const logout = async () => {
     deleteSession()
     redirect('/login')
}

export const login = async () => {
     
}