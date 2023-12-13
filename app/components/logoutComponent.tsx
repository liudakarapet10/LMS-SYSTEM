export const LogoutComponent = () => {
    return (
        <div className="text-center p-6 bg-gray-300">
        <form action="/logout" method="post">
          <button
            type="submit"
            className="button"
          >
            Вихід
          </button>
        </form>
      </div>
    )
}