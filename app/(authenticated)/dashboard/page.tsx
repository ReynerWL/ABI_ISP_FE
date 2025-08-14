import Title from '#/components/reusable/Title'

const Dashboard = () => {
  return (
    <div className='h-full w-full'>
      <Title>Dashboard</Title>
      <div className='mt-6 grid h-screen w-full grid-rows-3 gap-6'>
        <div className='bg-red-200'></div>
        <div className='bg-red-200'></div>
        <div className='bg-red-200'></div>
      </div>
    </div>
  )
}

export default Dashboard
