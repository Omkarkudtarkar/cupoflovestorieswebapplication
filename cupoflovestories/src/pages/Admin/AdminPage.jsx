import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const ADMIN_PASSWORD = 'cupoflovestories2026'

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_authed') === 'true')
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState('')

  const checkPw = () => {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authed', 'true')
      setAuthed(true)
    } else {
      setPwError('Incorrect password.')
      setPw('')
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef]">
        <div className="text-center" style={{ background:'rgba(255,255,255,0.9)', borderRadius:16, padding:'48px 36px', boxShadow:'0 20px 50px rgba(0,0,0,0.1)', minWidth:340 }}>
          <h1 className="serif text-4xl mb-2">Admin Access</h1>
          <p className="text-gray-500 mb-8 text-sm tracking-wide">Cup Of Love Stories</p>
          <input
            type="password"
            placeholder="Enter password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && checkPw()}
            className="w-full border-b border-gray-400 bg-transparent py-3 outline-none text-base mb-2 placeholder-gray-400"
          />
          {pwError && <p className="text-red-500 text-sm mb-4">{pwError}</p>}
          <button onClick={checkPw} className="serif mt-6 border-2 border-black px-10 py-3 text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300 w-full">
            ENTER
          </button>
        </div>
      </div>
    )
  }

  return <AdminDashboard />
}

function AdminDashboard() {
  const [tab, setTab] = useState('india')
  const [indiaPhotos, setIndiaPhotos] = useState([])
  const [europePhotos, setEuropePhotos] = useState([])
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [msg, setMsg] = useState('')

  const bucket = tab === 'india' ? 'india-photos' : 'europe-photos'
  const photos = tab === 'india' ? indiaPhotos : europePhotos

  useEffect(() => { loadPhotos('india'); loadPhotos('europe') }, [])

  async function loadPhotos(region) {
    const b = region === 'india' ? 'india-photos' : 'europe-photos'
    const { data, error } = await supabase.storage.from(b).list('', { sortBy: { column: 'name', order: 'asc' } })
    if (data && !error) {
      const files = data.filter(f => f.name.match(/\.(jpg|jpeg|png|webp)$/i)).map(f => {
        const { data: { publicUrl } } = supabase.storage.from(b).getPublicUrl(f.name)
        return { name: f.name, url: publicUrl }
      })
      region === 'india' ? setIndiaPhotos(files) : setEuropePhotos(files)
    }
  }

  async function handleUpload(e) {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    setMsg('')
    for (const file of files) {
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage.from(bucket).upload(fileName, file, { contentType: file.type })
      if (error) { setMsg('Error uploading ' + file.name + ': ' + error.message); setUploading(false); return }
    }
    setMsg('Uploaded ' + files.length + ' photo' + (files.length > 1 ? 's' : '') + ' successfully!')
    setUploading(false)
    loadPhotos(tab)
    e.target.value = ''
  }

  async function handleDelete(fileName) {
    if (!confirm('Delete "' + fileName + '"?')) return
    setDeleting(fileName)
    const { error } = await supabase.storage.from(bucket).remove([fileName])
    if (error) alert('Error deleting: ' + error.message)
    else setMsg('Deleted "' + fileName + '"')
    setDeleting(null)
    loadPhotos(tab)
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef] pt-16 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="serif text-4xl mb-1">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm tracking-wide">Cup Of Love Stories — Photo Management</p>
          </div>
          <div className="flex gap-3">
            <a href="/" className="text-sm text-gray-500 hover:text-black border border-gray-300 px-4 py-2">Back to Site</a>
            <button onClick={() => { sessionStorage.removeItem('admin_authed'); window.location.reload() }} className="text-sm text-gray-500 hover:text-red-500 border border-gray-300 px-4 py-2">Logout</button>
          </div>
        </div>

        <div className="flex gap-0 mb-10 border border-black w-fit">
          {['india','europe'].map(r => (
            <button key={r} onClick={() => { setTab(r); setMsg('') }}
              className={'px-10 py-3 text-sm tracking-widest serif transition-all duration-300 ' + (tab === r ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-gray-100')}>
              {r.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="mb-10 p-8 border border-dashed border-gray-400 rounded-xl bg-white/60 text-center">
          <p className="serif text-2xl mb-2">Upload Photos</p>
          <p className="text-gray-500 text-sm mb-6">JPG, PNG or WebP · Multiple files · For <strong>{tab === 'india' ? 'India' : 'Europe'}</strong> collection</p>
          <label className="cursor-pointer inline-block">
            <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" disabled={uploading} />
            <span className={'serif border-2 border-black px-10 py-3 text-sm tracking-widest inline-block transition-all duration-300 ' + (uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white cursor-pointer')}>
              {uploading ? 'UPLOADING...' : 'CHOOSE PHOTOS'}
            </span>
          </label>
          {msg && <p className={'mt-4 text-sm ' + (msg.includes('Error') ? 'text-red-500' : 'text-green-600')}>{msg}</p>}
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="serif text-2xl">{tab === 'india' ? 'India' : 'Europe'} Collection</h2>
            <span className="text-gray-500 text-sm">{photos.length} photo{photos.length !== 1 ? 's' : ''}</span>
          </div>

          {photos.length === 0 ? (
            <div className="text-center py-24 text-gray-400 border border-dashed border-gray-300 rounded-xl">
              <p className="serif text-xl mb-2">No photos yet</p>
              <p className="text-sm">Upload photos above to see them here</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {photos.map(({ name, url }) => (
                <div key={name} className="relative group rounded-lg overflow-hidden bg-gray-100" style={{ aspectRatio:'1' }}>
                  <img src={url} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <button onClick={() => handleDelete(name)} disabled={deleting === name}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-red-500 border border-red-400 px-3 py-1 text-xs tracking-wide hover:bg-red-500 hover:text-white">
                      {deleting === name ? '...' : 'DELETE'}
                    </button>
                  </div>
                  <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-2 py-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">{name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
