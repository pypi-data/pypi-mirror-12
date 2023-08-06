import os
import sys
from .connection import Connection, Pager
from .exceptions import ResponseError

token = os.environ.get("GITHUB_TOKEN")
debug = os.environ.get("DEBUG")

if debug: 
  if (token == None): 
    print("No GITHUB_TOKEN found")
  else: 
    print("GITHUB_TOKEN found of length %d" % len(token))

conn = Connection(token)
  
def unique(array): 
  return list({v['user_name']:v for v in array}.values())

def flatten(array):
  return [item for sublist in array for item in sublist]

def get_code_contributors(repo_name): 
  progress("Collecting contributors")
  users = []
  pager = Pager(conn, "/repos/%s/contributors" % repo_name, params={}, max_pages=0)
  for response in pager:
      progress_advance()
      for entry in response.json():
          users.append(get_user_data(entry))
  progress_complete()
  return unique(users)

def get_code_commentors(repo_name, limit):
  progress("Collecting commentors")
  pri_count = get_pri_count(repo_name)
  if limit == 0:
     minimum = 1
  else: 
    minimum = max(1, pri_count - limit)

  users = []
  for index in range(minimum, pri_count + 1):
      users.append(get_user("/repos/%s/pulls/%d" % (repo_name, index)))
      users.append(get_user("/repos/%s/issues/%d" % (repo_name, index)))
      users.append(get_users("/repos/%s/pulls/%d/comments" % (repo_name, index)))
      users.append(get_users("/repos/%s/issues/%d/comments" % (repo_name, index)))
  progress_complete()

  return unique(flatten(users))


def get_data(uri):
    try: 
      resp = conn.send("GET", uri)
      return resp.json()
    except ResponseError as e: 
      return None


def get_pri_count(repo_name):
    prs = get_data("/repos/%s/pulls?state=all" % repo_name)
    issues = get_data("/repos/%s/issues?state=all" % repo_name)

    if not prs:
        pr_count = 0
    else:
        pr_count = prs[0]["number"]

    if not issues:
        issue_count = 0
    else:
        issue_count = issues[0]["number"]

    return max(pr_count, issue_count)

def get_user_data(entry):
    if "user" in entry.keys():
      return {"user_name": entry["user"]["login"], "avatar": "%s&s=128" % entry["user"]["avatar_url"],
              "name": get_user_name(entry["user"]["login"])}
    else:
      return {"user_name": entry["login"], "avatar": "%s&s=128" % entry["avatar_url"], "name": get_user_name(entry["login"])}

def get_user(uri):
    progress_advance()
    entry = get_data(uri)
    if entry is not None:
        return [get_user_data(entry)]
    else:
        return []

def get_users(uri):
    users = []
    try:
        pager = Pager(conn, uri, params={}, max_pages=0)
        for response in pager:
            progress_advance()
            for entry in response.json():
                users.append(get_user_data(entry))
    except ResponseError as e:
        pass

    return users

def repo_exists(repo_name):
    try:
        repo = conn.send("GET", "/repos/%s" % repo_name)
        return True 
    except ResponseError as e:
        return False

def progress(message):
    sys.stdout.write("%s..." % message)
    sys.stdout.flush()

def progress_advance():
    sys.stdout.write(".")
    sys.stdout.flush()

def progress_complete():
    sys.stdout.write("\n")

def get_user_name(login):
    user = get_data("/users/%s" % login)
    if user["name"] is None: user["name"] = login
    return user["name"]

def display_user_name(user, args):
    if args.show_names and user["name"] != user["user_name"]:
      print("%s (%s)" % (user["user_name"], user['name']))
    else: 
      print(user["user_name"])

def display_user_html(user, args):
    url = "https://github.com/%s/issues?q=involves:%s" % (args.repo_name, user["user_name"])
    html = ("<div><a href='%s'><img src='%s' width='128' alt='%s'></a><div>%s</div></div>\n" % 
        (url, user["avatar"], user["user_name"], user['name']))
    return html
