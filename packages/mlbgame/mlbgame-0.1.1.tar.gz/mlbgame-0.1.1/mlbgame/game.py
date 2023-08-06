import urllib2 as url
import lxml.etree as etree
import os
import gzip

def scoreboard(year, month, day, home=None, away=None):
    monthstr = str(month).zfill(2)
    daystr = str(day).zfill(2)
    filename = "gameday-data/year_"+str(year)+"/month_"+monthstr+"/day_"+daystr+"/scoreboard.xml.gz"
    file = os.path.join(os.path.dirname(__file__), filename)
    if os.path.isfile(file):
        data = file
    else:
        data = url.urlopen("http://gd2.mlb.com/components/game/mlb/year_"+str(year)+"/month_"+monthstr+"/day_"+daystr+"/scoreboard.xml")
        import mlbgame.update_games
        mlbgame.update_games.run(hide=True)
    parsed = etree.parse(data)
    root = parsed.getroot()
    games = {}
    for game in root:
        if game.tag == "go_game":
            teams = game.findall('team')
            home_name = teams[0].attrib['name']
            away_name = teams[1].attrib['name']
            if (home_name == home and home!=None) or (away_name == away and away!=None) or (away==None and home==None):
                game_type = "go_game"
                game_data = game.find('game')
                game_id = game_data.attrib['id']
                game_league = game_data.attrib['league']
                game_status = game_data.attrib['status']
                game_start_time = game_data.attrib['start_time']
                home_team_data = teams[0].find('gameteam')
                home_team = {'name': home_name, 'runs': int(home_team_data.attrib['R']), 'hits':int(home_team_data.attrib['H']), 'errors':int(home_team_data.attrib['E'])}
                away_team_data = teams[1].find('gameteam')
                away_team = {'name': away_name, 'runs': int(away_team_data.attrib['R']), 'hits':int(away_team_data.attrib['H']), 'errors':int(away_team_data.attrib['E'])}
                w_pitcher_data = game.find('w_pitcher')
                w_pitcher_name = w_pitcher_data.find('pitcher').attrib['name']
                w_pitcher = {'name':w_pitcher_name, 'wins':int(w_pitcher_data.attrib['wins']), 'losses':int(w_pitcher_data.attrib['losses'])}
                l_pitcher_data = game.find('l_pitcher')
                l_pitcher_name = l_pitcher_data.find('pitcher').attrib['name']
                l_pitcher = {'name':l_pitcher_name, 'wins':int(l_pitcher_data.attrib['wins']), 'losses':int(l_pitcher_data.attrib['losses'])}
                sv_pitcher_data = game.find('sv_pitcher')
                sv_pitcher_name = sv_pitcher_data.find('pitcher').attrib['name']
                sv_pitcher = {'name':sv_pitcher_name, 'saves':int(sv_pitcher_data.attrib['saves'])}
                output = {'game_id':game_id, 'game_type':game_type, 'game_league':game_league, 'game_status':game_status, 'game_start_time':game_start_time, 'home_team':home_team, 'away_team':away_team, 'w_pitcher':w_pitcher, 'l_pitcher':l_pitcher, 'sv_pitcher':sv_pitcher}
                games[game_id]=output
        elif game.tag == "sg_game":
            teams = game.findall('team')
            home_name = teams[0].attrib['name']
            away_name = teams[1].attrib['name']
            if (home_name == home and home!=None) or (away_name == away and away!=None) or (away==None and home==None):
                game_type = "sg_game"
                game_data = game.find('game')
                game_id = game_data.attrib['id']
                game_league = game_data.attrib['league']
                game_status = game_data.attrib['status']
                game_start_time = game_data.attrib['start_time']
                delay_reason = game_data.find('delay_reason').text
                teams = game.findall('team')
                home_team_data = teams[0].find('gameteam')
                home_team = {'name': teams[0].attrib['name'], 'runs': int(home_team_data.attrib['R']), 'hits':int(home_team_data.attrib['H']), 'errors':int(home_team_data.attrib['E'])}
                away_team_data = teams[1].find('gameteam')
                away_team = {'name': teams[1].attrib['name'], 'runs': int(away_team_data.attrib['R']), 'hits':int(away_team_data.attrib['H']), 'errors':int(away_team_data.attrib['E'])}
                output = {'game_id':game_id, 'game_type':game_type, 'game_league':game_league, 'game_status':game_status, 'game_start_time':game_start_time, 'home_team':home_team, 'away_team':away_team, 'delay_reason':delay_reason, 'w_pitcher':{}, 'l_pitcher':{}, 'sv_pitcher':{}}
                games[game_id]=output
    return games

class GameScoreboard(object):
    '''
    Object to hold information about a certain game
    '''
    def __init__(self, data):
        self.game_id = data['game_id']
        self.game_type = data.get('game_type', '')
        self.game_status = data.get('game_status', '')
        self.game_league = data.get('game_league', '')
        self.game_start_time = data.get('game_start_time', '')
        self.home_team = data.get('home_team', '').get('name', '')
        self.home_team_runs = data.get('home_team', 0).get('runs', 0)
        self.home_team_hits = data.get('home_team', 0).get('hits', 0)
        self.home_team_errors = data.get('home_team', 0).get('errors', 0)
        self.away_team = data.get('away_team', '').get('name', '')
        self.away_team_runs = data.get('away_team', 0).get('runs', 0)
        self.away_team_hits = data.get('away_team', 0).get('hits', 0)
        self.away_team_errors = data.get('away_team', 0).get('errors', 0)
        self.w_pitcher = data.get('w_pitcher', '').get('name', '')
        self.w_pitcher_wins = data.get('w_pitcher', 0).get('wins', 0)
        self.w_pitcher_losses = data.get('w_pitcher', 0).get('losses', 0)
        self.l_pitcher = data.get('l_pitcher', '').get('name', '')
        self.l_pitcher_wins = data.get('l_pitcher', 0).get('wins', 0)
        self.l_pitcher_losses = data.get('l_pitcher', 0).get('losses', 0)
        self.sv_pitcher = data.get('sv_pitcher', '').get('name', '')
        self.sv_pitcher_saves = data.get('sv_pitcher', 0).get('saves', 0)
    
    def nice_score(self):
        '''
        Return a nicely formatted score of the game
        '''
        return '%s (%d) at %s (%d)' % (self.away_team, self.away_team_runs, self.home_team, self.home_team_runs)
    
    def __str__(self):
        return self.nice_score()